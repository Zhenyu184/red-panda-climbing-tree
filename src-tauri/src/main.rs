// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::time::Duration;
use reqwest;

fn fetch(url: &str) -> String {
    let client = reqwest::blocking::Client::builder()
        .timeout(Duration::from_secs(5))
        .build()
        .unwrap();

    match client.get(url).send() {
        Ok(response) => match response.text() {
            Ok(text) => text,
            Err(_) => String::new(),
        },
        Err(_) => String::new(),
    }
}

#[tauri::command]
fn request(url: &str) -> String  {
    println!("run request, url = {}", url);

    if url.trim().is_empty() {
        return String::from("url is empty");
    }

    println!("run handler2 {}", url);

    format!("Hello, {}! This is handler2.", url)
}

#[tauri::command]
fn handler1(name: &str) -> String {
    println!("run handler1 {}", name);
    let _body = fetch("https://www.rust-lang.org");
    // println!("body = {_body:?}");

    format!("Hello, {}! You've been handler 1 from Rust!", name)
}

#[tauri::command]
fn request_cmd(url: &str) -> String {
    println!("run request command ");
    format!("Hello, ! This is handler2.")
}

#[tauri::command]
fn handler3(name: &str) -> String {
    println!("run handler3 {}", name);
    format!("Hello, {}! This is handler3.", name)
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![handler1, request_cmd, handler3, request])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

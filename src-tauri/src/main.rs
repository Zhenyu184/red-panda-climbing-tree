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
fn handler1(name: &str) -> String {
    let _body = fetch("https://www.rust-lang.org");
    // println!("body = {_body:?}");

    format!("Hello, {}! You've been handler 1 from Rust!", name)
}

#[tauri::command]
fn handler2(name: &str) -> String {
    println!("run handler2 {}", name); //
    format!("Hello, {}! This is handler2.", name)
}

#[tauri::command]
fn handler3(name: &str) -> String {
    format!("Hello, {}! This is handler3.", name)
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![handler1, handler2, handler3])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

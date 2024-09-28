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
fn greet(name: &str) -> String {
    let body = fetch("https://www.rust-lang.org");
    println!("body = {body:?}");

    format!("Hello, {}! You've been greeted from Rust!", name)
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![greet])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

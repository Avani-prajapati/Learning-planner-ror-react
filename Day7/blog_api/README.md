# Blog API (Ruby on Rails)

## Overview

This project is a **Ruby on Rails API application** built as part of a learning exercise. It demonstrates building a RESTful backend, working with background jobs, and writing automated tests using RSpec.

---

## Prerequisites

Ensure the following tools are installed:

* Ruby (3.x recommended)
* Rails
* Bundler
* SQLite or PostgreSQL
* Git

Check installed versions:

```bash
ruby -v
rails -v
bundle -v
```

---

## Setup Instructions

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd blog_api
```

---

### 2. Install Dependencies

```bash
bundle install
```

---

### 3. Setup Database

Create the database:

```bash
rails db:create
```

Run migrations:

```bash
rails db:migrate
```

Prepare the test database for RSpec:

```bash
rails db:test:prepare
```

---

### 4. Start the Rails Server

```bash
rails server
```

The application will start at:

```
http://localhost:3000
```

---

## Running Tests

To run automated tests:

```bash
bundle exec rspec
```

---

## Background Jobs

The project includes a sample **ActiveJob background job** implementation to demonstrate asynchronous task handling.

---

## Tech Stack

* Ruby
* Ruby on Rails (API mode)
* ActiveJob
* RSpec
* SQLite / PostgreSQL

---

## Notes

If you encounter a **PendingMigrationError** while running tests, ensure the test database migrations are applied:

```bash
rails db:test:prepare
```

---


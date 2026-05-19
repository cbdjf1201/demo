# SQL Draft: Estimate History / 估值历史表结构草案

## 1. Purpose / 目的
该表仅在历史记录需要持久化时启用。

## 2. Minimal Table / 最小表结构
```sql
create table estimate_history (
    id bigint generated always as identity primary key,
    square_footage numeric(10,2) not null,
    bedrooms integer not null,
    bathrooms numeric(4,2) not null,
    year_built integer not null,
    lot_size numeric(10,2) not null,
    distance_to_city_center numeric(10,2) not null,
    school_rating numeric(4,2) not null,
    predicted_price numeric(12,2) not null,
    created_at timestamp not null default current_timestamp
);
```

## 3. Notes / 说明
- `SQLite` 可作为本地演示持久化方案
- 若当前阶段不落数据库，允许使用内存型 repository 作为 v1 实现

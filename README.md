# Customer Loyalty Points System

Command-line application for managing customer loyalty points.

## Architecture

Simplified **Hexagonal Architecture** where:

- `Store` interface acts as a port
- `store.memory.ts` provides the adapter implementation
- Domain logic is isolated from infrastructure

## Project Structure

```
src/
├── index.ts
└── loyalty/
    ├── domain.ts         # Business logic
    ├── store.memory.ts   # Simple store adapter
    ├── cli.ts            # CLI adapter for task (parsing commands, formatting output)
    └── domain.test.ts    # Unit tests
```

## Installation & Usage

```bash
pnpm install

# Interactive mode (with the result saved locally)
pnpm dev

earn test 100
redeem test 50
balance test

# One-off command (memory does not persist between runs)
pnpm loyalty earn user123 100
pnpm loyalty redeem user123 50
pnpm loyalty balance user123

# Run tests
pnpm test
```

## Business Rules

- Customers identified by string ID
- Only positive integers accepted for points
- Cannot redeem more than available balance
- Warning triggered when balance < 10 after redemption
- Data stored in-memory (runtime only)

## Example

```bash
> earn user123 100
Earned 100 points for user123. Balance: 100

> redeem user123 95
Redeemed 95 points for user123. Balance: 5
Warning: Customer user123 has a low balance: 5 points.
```

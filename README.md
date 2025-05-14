# ⚛️ React Optimization Hooks: `useMemo`, `useCallback`, and `React.memo`

React re-renders components whenever their parent renders or their internal state/props change. While this ensures a consistent UI, it can lead to **unnecessary re-renders** and **performance bottlenecks**, especially in large or complex apps.

To address this, React provides optimization tools like `useMemo`, `useCallback`, and `React.memo`.

---

## 🧠 `useMemo`

### What is it?

`useMemo` is a React Hook that **memoizes a computed value** — it only recalculates that value when its dependencies change.

```tsx
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
```

### Use Cases:

- **Expensive calculations** (e.g., filtering, sorting large lists).
- Preventing recalculation of derived data in render.
- Avoiding recomputing data that's used in children components.

### Example:

```tsx
const sortedUsers = useMemo(() => {
  return users.sort((a, b) => a.name.localeCompare(b.name));
}, [users]);
```

### When NOT to Use:

- For cheap or fast computations — `useMemo` adds overhead.
- If the calculation doesn’t happen on every render.
- When the dependencies rarely change (it could make code harder to understand).

---

## 🔁 `useCallback`

### What is it?

`useCallback` memoizes a function reference — returning the same function instance unless dependencies change.

```tsx
const memoizedCallback = useCallback(() => {
  doSomething(a, b);
}, [a, b]);
```

### Use Cases:

- **Passing stable function references** to child components to avoid unnecessary re-renders.
- When functions are dependencies of other hooks like `useEffect` or `useMemo`.
- Event handlers in optimized components.

### Example:

```tsx
const handleClick = useCallback(() => {
  setCount((c) => c + 1);
}, []);
```

### When NOT to Use:

- If the function is simple and doesn't cause re-renders.
- When not passing the function to child components.
- Overusing it can clutter the code and hurt readability.

---

## 🧱 `React.memo`

### What is it?

`React.memo` is a higher-order component that **memoizes a component**, preventing re-rendering unless its props change.

```tsx
const MyComponent = React.memo(({ prop }) => {
  return <div>{prop}</div>;
});
```

### Use Cases:

- **Pure functional components** with expensive rendering logic.
- When props change infrequently.
- For list items, UI elements that rarely change.

### Example:

```tsx
const UserCard = React.memo(({ user }) => {
  return <div>{user.name}</div>;
});
```

### When NOT to Use:

- For components that always receive new props (it won't help).
- For components with side effects in render (anti-pattern).
- When the props are complex and constantly changing (the shallow comparison won't help).

---

## 🚫 Common Pitfalls

| Tool          | Pitfall                                                  |
| ------------- | -------------------------------------------------------- |
| `useMemo`     | Adds unnecessary complexity for simple values            |
| `useCallback` | Doesn't prevent re-renders alone — must be used properly |
| `React.memo`  | Only works with pure components and shallow props        |

---

## ✅ General Guidelines

- **Profile first**: Only optimize after identifying real performance issues.
- Use `useMemo` for **expensive calculations**.
- Use `useCallback` when **passing callbacks to memoized children**.
- Use `React.memo` to **skip re-rendering pure components**.

Over-optimizing prematurely can lead to **hard-to-read code** and **worse performance** due to extra memoization overhead.

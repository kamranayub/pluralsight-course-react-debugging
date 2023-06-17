# Module 5: Work with Profiling Sessions

## Clip 5: Configure Production Profiling

In create-react-app:

  # npm
  npm run --- build --profile
  # yarn
  yarn build --profile

  # Serve production site locally
  npx serve -s build

In Next.js `next.config.js`:

```js
module.exports = {
  reactStrictMode: true,
  // Enable the React DevTools profiler
  profiler: true,
};
```

With custom `webpack.config.js`:

```js
module.exports = {
  // ... config ...
  resolve: {
    // ... config ...
    alias: {
      // ... config ...
      'react-dom$': 'react-dom/profiling',
    },
    // ... more config ...
  }
  // ... more config ...
}
```

## Resources

- [bvaughn - Profiling in production](https://gist.github.com/bvaughn/25e6233aeb1b4f0cdb8d8366e54a3977)
- [Kent C. Dodds - Profile a React app for Performance](https://kentcdodds.com/blog/profile-a-react-app-for-performance)
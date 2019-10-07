#srcset
- To use `srcset`:
    - `npm i --save-dev html-loader-srcset`
    - Add this rule in `webpack.config.js`
  
```
{
    test: /\.html$/,
    loader: 'html-srcsets-loader',
    options: {
        attrs: ['img:src', ':srcset'],
},

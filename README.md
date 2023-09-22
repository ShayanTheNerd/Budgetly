# Budgetly

A beautiful expense tracker for easily managing your financial accounts!

<figure>
  <img src="https://github.com/ShayanTheNerd/budgetly/blob/main/og-img.webp" />
</figure>

## Technologies used in this project

<ul>
  <li>HTML, CSS, JavaScript</li>
  <li>Tailwind CSS</li>
  <li>Vue.js 3</li>
</ul>

## Features

<ul>
  <li>Semantic, clean, and extendable code</li>
  <li>LocalStorage as temporary database</li>
  <li>Minimal and easy-to-use UI</li>
  <li>Animations</li>
</ul>

## How it works

First, select a type for your account (income/expense) by toggling the "+"/"-" button. Then, type the name of the item followed by its amount and add it to the list. It will be automatically placed in the incomes or expenses column based on the specified item type. It'll also get saved to the local storage to prevent data loss on page refresh or revisit.

## Development setup

#### First, you need to clone the project:

```sh
git clone https://github.com/ShayanTheNerd/budgetly.git
```

Alternatively, you can copy the source of the project directly to your local environment using <a href="https://github.com/Rich-Harris/degit">Degit</a>:

```sh
pnpm i -g degit

degit https://github.com/ShayanTheNerd/budgetly new-project-folder
```

#### Then, install corresponding packages and start the dev server:

```sh
pnpm i

pnpm run dev
```

## Deployment and production

Before deploying the project or creating a new pull request, run the following commands and make sure there are no errors:

```sh
pnpm run format

pnpm run build
```

## Style Guide

If you want to develop this project, please stick to these rules:

<ul>
  <li>Follow the current architecture, coding paradigm, and project folder structure.</li>
  <li>Follow the current character case principals for ids, classes, variables, file and folder names, etc.</li>
  <li>For styling, utilize Tailwind's features as much as possible, but also make sure to use the <a href="https://getbem.com">BEM</a> methodology for naming custom CSS classes.</li>
  <li>Add Git commit messages considering <a href="https://www.conventionalcommits.org/">Conventional Commits</a>.</li>
</ul>

## Contribution

Your contribution is always welcome, please follow these steps:

<ol>
  <li>Fork the project (https://github.com/ShayanTheNerd/budgetly/fork).</li>
  <li>Create your feature branch (<code>git checkout -b feat/branch-name</code>).</li>
  <li>Make sure you follow instructions in the <a href="https://github.com/ShayanTheNerd/budgetly#style-guide">style guide</a>.</li>
  <li>Commit your changes (<code>git commit -m 'feat: add foo bar baz feature'</code>).</li>
  <li>Push the branch (<code>git push origin feat/branch-name</code>).</li>
  <li>Create a new Pull Request.</li>
</ol>

## Links

Project homepage: https://shayanthenerd.github.io/budgetly <br /><br />
GitHub repository: https://github.com/ShayanTheNerd/budgetly <br /><br />
Issues: https://github.com/ShayanTheNerd/budgetly/issues <br /><br />
Pull requests: https://github.com/ShayanTheNerd/budgetly/pulls <br /><br />
Other projects: https://shayan-zamani.me/#portfolio <br /><br />

## Author

<a href="https://shayan-zamani.me">Shayan Zamani</a>

## License

The code in this project is licensed under <a href="https://github.com/ShayanTheNerd/budgetly/blob/main/LICENSE.MD">MIT license</a>. You're free to use it; but a link to this page and mentioning the author's name is mandatory.

<br />
<a href="https://github.com/ShayanTheNerd/budgetly#readme">back to top ⬆️</a>

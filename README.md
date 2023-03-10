# Milestone 1 Template

This repository serves as a template for you to start your Milestone 1 Assignment.

## Usage

To use this project, run a local web server inside the public/ directory to serve your index.html page.

You can either use `python3 -m http.server`, or use the Live Server VS Code Extension. To get started with one of these, you can find [more info here](https://cs5356.intricatecloud.io/unit-1-static-sites/browser-development-environment)

## Developing

All the source files are in the `public/` folder. `public` is a convention for the name of the folder that contains all the "public" files that will be accessible for your website. In this case, we have a static website so our source files are the "public" files.

By default, the index.html has the barebones of an HTML page, with a link to Bulma's CSS already included.

You can choose to use a different CSS framework like Tailwind or Bootstrap if you wish. Don't forget to remove the `<link>` element that pulls in Bulma CSS.

Use the `public/assets/` folder to store any images you may need to display.

Use the `public/data/` folder to access the JSON file containing the list of products to display on your page.

Update the `purchaseLink` field in `public/data/products.json` for each of the respective products once you've created the products in your test Stripe account.

## Testing

For your own testing, review the requirements outlined in the assignment. Make sure your submitted code works.

To test your Stripe payment links, take a look at their [guide on testing](https://stripe.com/docs/testing)

Prioritize working code first!

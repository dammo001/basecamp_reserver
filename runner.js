const puppeteer = require('puppeteer');
const dateFormat = require('dateformat');

const optionDefinitions = [
  { name: 'username', alias: 'u', type: String },
  { name: 'password', alias: 'p', type: String },
  { name: 'location', alias: 'l', type: String },
  { name: 'time', alias: 't', type: String },
];

//set the default values or use comand line args
const commandLineArgs = require('command-line-args')
const options = commandLineArgs(optionDefinitions)
options.location = options.location || "34319";
options.time = options.time || "06:15";

//find one week in advance
let nextWeek = new Date();
nextWeek.setDate(nextWeek.getDate()+7);
nextWeek = dateFormat(nextWeek, "mmmm dd");
options.nextWeek = nextWeek;

const setStudio = (page, options) => {
  page.evaluate((options) => {
    const loc  = document.getElementById("studio-location");
    //burlingame location value
    loc.value = options.location;
    var event = new Event('change', { bubbles: true });
    loc.dispatchEvent(event);
  }, options);
};

const login = (page, options) => {
  page.evaluate((options) => {
    document.getElementById('username').value = options.username;
    document.getElementById('password').value = options.password;
    document.querySelectorAll('.button.manin-cta-button')[0].click();
  }, options);
};

(async () => {
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();

  await page.goto('https://basecampfitness.co/sign-in/');
  //Have to set the location to burlingame first
  await setStudio(page, options);

  //Now we can sign in
  await page.goto('https://basecampfitness.co/sign-in/');
  await login(page, options);

  await page.waitForNavigation();

  await page.goto('https://basecampfitness.co/class-schedule/');

  //find the class and book it -- for some reason this was throwing an error as a separate function
  await page.evaluate((options) => {
    const header = [...document.querySelectorAll('.class-header')].find(el => {
      const text = el.children[0].innerHTML;
      return text.indexOf(options.nextWeek) > -1;
    });

    const found = [...header.parentNode.children].find(el => {
      text = el.outerText;
      return text.indexOf(options.time) > -1;
    });

    if (found) found.children[1].children[1].click();

    const modal = [...document.querySelectorAll('.class-info-overlay-bg')].find(el => {
      return el.style.cssText !== 'display: none;';
    });

    modal.children[0].children[4].click();
  }, options);

  await browser.close();
})();

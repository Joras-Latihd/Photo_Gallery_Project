## 🖼️ **Photo Gallery Web App**

A sleek and responsive photo gallery built by **SAROJ DHITAL** using **HTML, CSS, and JavaScript**, based on the top 10 nominees for the Ballon d'Or 2025 in football.

This project showcases modern design with a clean responsive grid, smooth hover animations, a full-screen photo viewer, and a mobile-friendly interface for browsing image collections with ease.
***


## 🛠️ **Technologies Used:**

🟩 Frontend: HTML5, CSS3 (Flexbox & Grid for layout, gradients, shimmer loading, hover effects, dark theme with gold accents)

🟩 Typography: Barlow Condensed and Inter (Google Fonts)

🟩 Logic: JavaScript (lightweight, data-driven, and easy to read)
***


## 🔑 **Features:**

✅ Photos displayed in an organized, responsive grid (4, 3, 2, or 1 columns depending on screen size)

✅ Gold, silver, and bronze rank badges for the top 3 players

✅ Player name, club, and country always visible on every card

✅ Smooth hover effects and animations

✅ Shimmer loading effect, with a fallback card if a photo is missing

✅ Full-screen photo viewer with a counter (for example, 3 / 10) and caption

✅ Navigate with Next / Previous buttons, arrow keys, Home / End keys, thumbnails, or swipe on touch screens

✅ Close the viewer with the close button, a click outside the photo, or the Escape key

✅ Neighbouring photos are preloaded for instant navigation

✅ Lazy loading support for better performance

✅ Keyboard and accessibility support (focus stays inside the viewer and returns to the card when it closes)

✅ Easy customization (add or replace players by editing one list)
***


## 🚀 **How It Works:**

♦️ User opens the gallery in the browser.

♦️ Photos are displayed in a responsive grid, built from a list of players in `script.js`.

♦️ Clicking a photo opens it in the full-screen viewer.

♦️ Users can navigate between photos or close the viewer easily.

**🎯 Special handling for:**

♦️ Large and tall images ➝ Scales to fit the screen without being cut off

♦️ Mobile devices ➝ Touch-friendly swipe navigation and always-visible captions

♦️ Slow connections ➝ Shimmer placeholders and lazy loading

♦️ Missing images ➝ A clear "Photo unavailable" card instead of an empty box
***


## 🗂️ **Project Structure:**

```
Photo_Gallery_Project/
├── index.html    → Page structure and viewer markup
├── styles.css    → Theme, responsive grid, and viewer styling
├── script.js     → Player list, gallery builder, and viewer logic
└── images/       → Player photos (dembele.jpg, raphinha.jpg, ...)
```
***


## ✏️ **Customization:**

To add or change a player, edit the `PLAYERS` list at the top of `script.js`:

```js
{ name: "Player Name", club: "Club", country: "Country", file: "image-name" }
```

Then place the matching photo in the `images/` folder, for example `images/image-name.jpg`. The order of the list sets the ranking.
***


## 🔧 **What Changed in the Upgrade:**

* 🎨 Redesigned the look with a dark theme, gold accents, and sports-style fonts
* 🧱 Fixed the viewer layout, so thumbnails now sit below the photo and no longer stretch
* 🖼️ Tall photos now fit the screen instead of being cut off, and portraits are cropped to keep faces visible
* 📱 Captions are now always visible, so they work on phones without hover
* 🧭 Added a photo counter, keyboard shortcuts, and swipe that no longer triggers on vertical scrolling
* ♿ Added proper dialog behavior, focus handling, and a reduced-motion setting
* ⚡ Fixed the wrong photo showing when clicking through quickly
* 🗂️ Switched to a data-driven gallery, so the HTML is shorter and adding a player takes one line
***


## 📸 **Screenshots:**
**Homepage**
![alt text](https://github.com/Joras-Latihd/Photo_Gallery_Project/blob/3db8dea230e1a5f40fbff7b7d887467ec2edc38e/Updated%20Homepage.png)
**Individual Image**
![alt text](https://github.com/Joras-Latihd/Photo_Gallery_Project/blob/3db8dea230e1a5f40fbff7b7d887467ec2edc38e/Updated%20Individual%20Image.png)
***


## 💡 **Future Enhancements (Ideas):**

* 🔎 Search and filter players by club or country
* ❤️ Favorites saved in the browser
* ⬇️ Download and share buttons in the viewer
* 🔍 Zoom in the viewer
* 📤 Upload your own photos
***


## 🙌 **Author**

**Saroj Dhital**
Computer Science Student & Web Enthusiast
***

## ☀️ **Show Your Support**

If you liked the project:

⭐ Star this repo  

🔗 Share with your friends!
***

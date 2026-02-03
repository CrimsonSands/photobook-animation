# 3D Photo Book Animation

An interactive 3D photo book with smooth page turn animations. The book is displayed at a perspective angle and allows users to navigate through pages by clicking or touching the left/right pages.

## Features

- **3D Perspective**: Book is rendered with realistic 3D transforms and perspective
- **Smooth Animations**: Fluid page turn animations with realistic physics
- **Touch Support**: Click pages or use navigation buttons to turn pages
- **Swipe Gestures**: Mobile-friendly with swipe support for page navigation
- **Responsive Design**: Adapts to different screen sizes

## How to Use

1. Open `index.html` in a modern web browser
2. Click on the **left page** to turn to the previous page
3. Click on the **right page** to turn to the next page
4. Use the **Previous/Next buttons** at the bottom for navigation
5. On mobile devices, **swipe left or right** to turn pages

## Project Structure

- `index.html` - Main HTML structure
- `styles.css` - 3D transforms, animations, and styling
- `script.js` - Page turn logic and interaction handling

## Customization

To add your own photos, edit the `pages` array in `script.js`:

```javascript
this.pages = [
    { color: 'linear-gradient(...)', text: 'Photo 1' },
    // Add more pages here
];
```

Replace the placeholder gradients with your own images by modifying the CSS background properties.

## Browser Support

Works best in modern browsers that support CSS 3D transforms:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

## Technologies Used

- HTML5
- CSS3 (3D Transforms, Animations)
- Vanilla JavaScript (ES6+)
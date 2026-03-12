# Mrs Harriet Atuahene Sarkodie (Mrs AKOSAC) - Funeral Programme

An interactive funeral programme website for Mrs Harriet Atuahene Sarkodie (Mrs AKOSAC), aka Auntie Akweley.

## Event Details

- **Date:** 2nd May 2026
- **Time:** 11:00 AM
- **Venue:** AGA Basic School
- **Body Viewing:** AKOSAC's residence, Akosac's Street near Santiago Bar at 8:30 AM
- **Eulogy, Music & Photo Gallery:** 9:30 AM

## Features

- **Responsive Design** - Works seamlessly on all devices
- **Dark Mode** - Toggle between light and dark themes
- **Interactive Photo Gallery** - Click to view photos in full-screen lightbox with keyboard navigation
- **Smooth Scrolling** - Navigate between sections with smooth animations
- **Active Section Highlighting** - Navigation automatically highlights the current section
- **Mobile-Friendly Menu** - Collapsible navigation for mobile devices
- **Scroll to Top** - Quick button to return to the top of the page

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/cayekple/mrs-akosac.git
cd mrs-akosac
```

2. Install dependencies:
```bash
npm install
```

3. Add images to the `public/img/` directory:
   - `main.jpg` - Main photo of Mrs AKOSAC
   - `family1.jpg`, `family2.jpg`, `family3.jpg` - Family photos
   - `memorial1.jpg`, `memorial2.jpg`, `memorial3.jpg` - Memorial photos

### Development

Run the development server:
```bash
npm run dev
```

The site will be available at `http://localhost:5173`

### Build

Build for production:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

### Deploy

Deploy to GitHub Pages:
```bash
npm run deploy
```

## Technology Stack

- **React 19** - UI framework
- **TypeScript** - Type-safe JavaScript
- **Vite** - Fast build tool
- **Tailwind CSS 4** - Utility-first CSS framework
- **GitHub Pages** - Hosting

## Project Structure

```
mrs-akosac/
├── public/
│   ├── img/           # Image assets
│   └── favicon.ico    # Site favicon
├── src/
│   ├── App.tsx        # Main application component
│   ├── index.tsx      # Application entry point
│   └── index.css      # Global styles and animations
├── index.html         # HTML template
├── package.json       # Dependencies and scripts
├── tsconfig.json      # TypeScript configuration
└── vite.config.ts     # Vite configuration
```

## Customization

To customize the content:

1. **Update event details** - Edit `src/App.tsx` lines 200-225
2. **Change biography** - Edit `src/App.tsx` lines 255-280
3. **Update program schedule** - Edit `src/App.tsx` lines 290-330
4. **Add/remove photos** - Edit `galleryCategories` in `src/App.tsx` lines 18-42

## License

This project is created for memorial purposes.

## In Loving Memory

Mrs Harriet Atuahene Sarkodie (Mrs AKOSAC)
May her soul rest in perfect peace.

// "Selected Work" — the curated, mixed portfolio shown on the homepage under the hero.
//
// HOW TO EDIT
// - The list reads top to bottom, and each row reads left to right.
// - A row holds 1, 2 or 3 photos. Photos in a row are shown at the same height, each
//   at its natural shape (nothing is cropped), so the row's look comes from the
//   photos you put together:
//     1 photo  -> a standout (best with a wide/landscape frame)
//     2 photos -> a pair
//     3 photos -> a trio of supporting images (best with tall/portrait frames)
// - On phones: a single shows full width; a pair of tall photos stays side by side,
//   any other pair stacks; a trio shows its first photo full width and the other two
//   side by side.
// - `width` / `height` must be the file's real pixel size (they set the shape and stop
//   the page jumping while photos load). To read them, run from the project folder:
//     node -e "require('sharp')('public/assets/dogs/FILE.jpg').metadata().then(m=>console.log(m.width,m.height))"
// - Optional for single-photo rows: `size: 'wide'` (about 3/4 width) and
//   `align: 'left' | 'right'` to offset it, for rhythm. Default is full width.
// - Keep the hero photos (see src/app/page.tsx) out of the first rows so the section
//   doesn't open on an image the visitor has just seen.

export interface WorkPhoto {
  src: string
  alt: string
  width: number
  height: number
}

export interface WorkRow {
  photos: WorkPhoto[]
  size?: 'full' | 'wide'
  align?: 'left' | 'right'
}

export const selectedWork: WorkRow[] = [
  // Opening trio: three close, warm, human moments (dog, person, person-and-dog).
  {
    photos: [
      {
        src: '/assets/dogs/happy-yellow-lab-portrait-nj.jpg',
        alt: 'Smiling yellow Labrador sitting in a sunlit forest clearing — dog photography, New Jersey',
        width: 1600,
        height: 2400,
      },
      {
        src: '/assets/portraits/denim-headshot-portrait-nj.jpg',
        alt: 'Woman in a denim top with both hands in her hair against a bright wall — portrait photography, New Jersey',
        width: 1600,
        height: 2400,
      },
      {
        src: '/assets/dogs/pet-photography-puppy-bond-nj.jpg',
        alt: 'Owner nose-to-nose with a yellow Labrador puppy — dog photography, New Jersey',
        width: 1600,
        height: 2400,
      },
    ],
  },
  // Standout: a black-and-white change of pace.
  {
    photos: [
      {
        src: '/assets/music/live-band-performance-nj.jpg',
        alt: 'Black-and-white photo of a guitarist in a cap and sunglasses playing on stage — live music photography, New Jersey',
        width: 2048,
        height: 1211,
      },
    ],
  },
  // Pair: earthy greens and browns — a craftsman at work beside an outdoor portrait.
  {
    photos: [
      {
        src: '/assets/business/barrister-coffee-roast-close-up-nj.jpg',
        alt: 'Barrister Coffee roaster in a cap and gloves working the roasting machine — small business photography, Basking Ridge NJ',
        width: 2400,
        height: 1606,
      },
      {
        src: '/assets/portraits/studio-headshot-portrait-nj.jpg',
        alt: 'Bearded man in a pink sweatshirt standing in the woods — portrait photography, New Jersey',
        width: 1365,
        height: 2048,
      },
    ],
  },
  // Trio: close / wide / medium — vivid color, a stage, a grinning dog.
  {
    photos: [
      {
        src: '/assets/business/sobol-acai-bowl-fruit-topping-nj.jpg',
        alt: 'SoBol acai bowl topped with mango, strawberries, blueberries and coconut — food photography, New Jersey',
        width: 1600,
        height: 2400,
      },
      {
        src: '/assets/music/live-music-photography-stage-nj.jpg',
        alt: 'Bassist playing on an outdoor stage with the drummer behind him — live music photography, New Jersey',
        width: 1365,
        height: 2048,
      },
      {
        src: '/assets/dogs/brindle-dog-portrait-nj.jpg',
        alt: 'Happy brindle dog with a blue collar looking at the camera — dog photography, New Jersey',
        width: 1600,
        height: 2400,
      },
    ],
  },
  // Standout: a wide environmental portrait that needs size to read.
  {
    photos: [
      {
        src: '/assets/portraits/environmental-portrait-nj.jpg',
        alt: 'Musician with a guitar seated on stone steps in a flowering garden — environmental portrait, New Jersey',
        width: 2048,
        height: 1365,
      },
    ],
  },
  // Pair: muted tones — motion on the beach, stillness behind the drum kit.
  {
    photos: [
      {
        src: '/assets/dogs/labradors-running-beach-nj.jpg',
        alt: 'Two yellow Labradors running toward the camera on the sand — dog photography, New Jersey',
        width: 1600,
        height: 2400,
      },
      {
        src: '/assets/music/live-music-performance-nj.jpg',
        alt: 'Black-and-white photo of a drummer singing into a microphone — live music photography, New Jersey',
        width: 2048,
        height: 1470,
      },
    ],
  },
  // Offset standout: warm gold detail.
  {
    size: 'wide',
    align: 'right',
    photos: [
      {
        src: '/assets/business/san-remo-espresso-machine-detail-nj.jpg',
        alt: 'Close detail of a San Remo espresso machine’s brass group heads and gauges — small business photography, New Jersey',
        width: 2400,
        height: 1600,
      },
    ],
  },
  // Closing trio: bright daylight — a portrait, a product, a puppy.
  {
    photos: [
      {
        src: '/assets/portraits/seated-portrait-session-nj.jpg',
        alt: 'Woman seated on a park bench in autumn light — portrait photography, New Jersey',
        width: 1600,
        height: 2400,
      },
      {
        src: '/assets/business/sobol-blue-acai-bowl-nj.jpg',
        alt: 'SoBol blue acai bowl with berries and coconut on a white counter — product photography, New Jersey',
        width: 1600,
        height: 2400,
      },
      {
        src: '/assets/dogs/yellow-lab-puppy-portrait-nj.jpg',
        alt: 'Yellow Labrador puppy sitting in the grass — dog photography, New Jersey',
        width: 1600,
        height: 2400,
      },
    ],
  },
]

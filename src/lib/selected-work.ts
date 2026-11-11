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
//   side by side. Put a trio's strongest photo first.
// - `width` / `height` must be the file's real pixel size (they set the shape and stop
//   the page jumping while photos load). To read them, run from the project folder:
//     node -e "require('sharp')('public/assets/dogs/FILE.jpg').metadata().then(m=>console.log(m.width,m.height))"
// - Optional for single-photo rows: `size: 'wide'` (about 3/4 width) and
//   `align: 'left' | 'right'` to offset it, for rhythm. Default is full width.
// - Keep the hero photos (see src/app/page.tsx) out of this list so the section
//   doesn't repeat an image the visitor has just seen.

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
  // Opening trio: the closest, warmest frames (dogs are the flagship subject).
  {
    photos: [
      {
        src: '/assets/dogs/brindle-dog-amber-background-portrait-nj.jpg',
        alt: 'Brindle dog with a white chest sitting against a warm amber background — dog photography, New Jersey',
        width: 1600,
        height: 2400,
      },
      {
        src: '/assets/portraits/woman-eyes-close-up-portrait-nj.jpg',
        alt: 'Extreme close-up of a woman’s eyes framed between her hands — portrait photography, New Jersey',
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
  // Standout: direct eye contact, full width, and a switch to deep green.
  {
    photos: [
      {
        src: '/assets/portraits/outdoor-headshot-portrait-nj.jpg',
        alt: 'Close portrait of a bearded man looking straight at the camera in front of green trees — portrait photography, New Jersey',
        width: 2048,
        height: 1214,
      },
    ],
  },
  // Trio: a bright portrait, a black-and-white studio moment, dogs in motion.
  {
    photos: [
      {
        src: '/assets/portraits/denim-headshot-portrait-nj.jpg',
        alt: 'Woman in a denim top with both hands in her hair against a bright wall — portrait photography, New Jersey',
        width: 1600,
        height: 2400,
      },
      {
        src: '/assets/music/chris-hajian-session-drummer-laughing-the-bunker-studio-brooklyn.jpg',
        alt: 'Black-and-white photo of a drummer laughing behind a fully miked drum kit during a session for jazz composer Chris Hajian at The Bunker Studio, Brooklyn',
        width: 1600,
        height: 2400,
      },
      {
        src: '/assets/dogs/labradors-running-beach-nj.jpg',
        alt: 'Two yellow Labradors running toward the camera on the sand — dog photography, New Jersey',
        width: 1600,
        height: 2400,
      },
    ],
  },
  // Offset closer: a craftsman at work, leading into the introduction.
  {
    size: 'wide',
    align: 'right',
    photos: [
      {
        src: '/assets/business/barrister-coffee-house-brand-photography-basking-ridge-nj.jpg',
        alt: 'Barista in a Barrister Coffee House hoodie, seen from behind, working at the espresso machine — small business photography, Basking Ridge NJ',
        width: 2400,
        height: 1600,
      },
    ],
  },
]

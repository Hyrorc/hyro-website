// HYRO brand photography — the client's own photo set (sliced from the supplied
// grid), bundled as local assets and unified by the duotone + grain via <Photo/>.
// Higher-resolution originals can replace any file in src/assets/brand/ later.

import freelance from '../assets/freelance.jpg'          // executive + skyline ("Impacting Businesses")
import chair from '../assets/chair.jpg'         // empty boardroom chair ("Cost of a Bad Hire")
import handshake from '../assets/handshake.jpg' // handshake ("Where Talent")
import books from '../assets/books.jpg'         // rows of books ("Rigorous Evaluation")
import hero from '../assets/hero.jpg'       // conversation over hero ("You Can Trust")
import woman from '../assets/woman.jpg'         // leader in meeting ("Shaping Leadership")
import lounge from '../assets/lounge.jpg'       // office lounge ("Your Next Chapter")
import cv from '../assets/cv.jpg'               // laptop + CV + coffee ("Unlock Your Potential")
import lobby from '../assets/lobby.jpg'         // building lobby ("Our Story")
import strategy from '../assets/strategy.jpg'   // strategy diagram ("Hire Your Right One")

export const PHOTOS = {
  heroMeeting: hero,
  cityExec: freelance,
  boardroomEmpty: chair,
  library: books,
  leaderWoman: woman,
  lounge,
  cvDesk: cv,
  lobby,
  handshake,
  strategy,
  // aliases used around the site
  portraitWoman: woman,
  portraitMan: freelance,
  office: lounge,
  desk: cv,
  boardroom: lounge,
}

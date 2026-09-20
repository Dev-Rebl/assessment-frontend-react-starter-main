import { ContentWrapper } from '../../components/ContentWrapper'
import { ThemeToggle } from '../../components/ThemeToggle'
import { MainSongs } from './components/MainSongs'
import { SavedSongs } from './components/SavedSongs'

export const Home = () => (
  <div className="grid h-dvh w-full grid-rows-[auto_minmax(0,1fr)] overflow-hidden">
    <div className="flex h-16 w-full items-center justify-end border-b px-4">
      <ThemeToggle />
    </div>

    <ContentWrapper className="min-h-0 w-full overflow-hidden">
      <div className="container mx-auto grid h-full min-h-0 grid-cols-1 grid-rows-2 gap-4 p-4 md:grid-cols-2 md:grid-rows-1">
        <MainSongs />
        <SavedSongs />
      </div>
    </ContentWrapper>
  </div>
)

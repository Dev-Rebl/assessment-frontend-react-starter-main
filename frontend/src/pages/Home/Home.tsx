import { PageLayout } from '../../components/PageLayout'
import { MainSongs } from './components/MainSongs'
import { SavedSongs } from './components/SavedSongs'

export const Home = () => (
  <PageLayout contentClassName="overflow-hidden">
    <div className="container mx-auto grid h-full min-h-0 grid-cols-1 grid-rows-2 gap-4 md:grid-cols-2 md:grid-rows-1">
      <MainSongs />
      <SavedSongs />
    </div>
  </PageLayout>
)

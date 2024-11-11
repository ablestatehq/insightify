export type Post = {
  readonly id: number;
  title: string;
  message: string;
  postedBy: PostedBy
}

interface PostedBy{
  name: string;
}

export interface SegmentedControlProps{
  selectedTab: Tab;
  onTabChange: (value: Tab) => void;
}

export type Story = {
  title: string;
  content: string;
  image: any,
}

export type StoryProps = {
  stories: Story[]
}

export type SquareProps = {
  discussions: Post[]
}

export type PostDiscussionModal = {
  visible: boolean,
  close: () => void
}

export type Tab = 'Square' | 'Stories'
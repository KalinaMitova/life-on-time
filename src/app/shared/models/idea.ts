export interface IdeaFiles {
  name: string,
  path: string
}
export interface IdeaInfo {
  content: string,
  files?: Array<IdeaFiles>,
  images?: Array<IdeaFiles>
}

export interface Idea {
  id: string
  name: string,
  info: IdeaInfo,
  created_at: string
}

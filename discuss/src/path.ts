const paths = {
    home: () => "/",           
    topicShow: (slug: string) => `/topics/${slug}`,
    postShow:(topicSlug: string, postId: string) => `/topics/${topicSlug}/posts/${postId}`,
    postCreate:(topicSlug: string) => `/topics/${topicSlug}/posts/new`,
}

export default paths;
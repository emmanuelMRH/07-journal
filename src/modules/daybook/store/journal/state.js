
export default () => ({
    isLoading: true,
    entries: [
        {
            id: new Date().getTime(),   //45641456156156
            date: new Date().toDateString(), //sat 23, julio
            text: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consequuntur a quibusdam unde quisquam! Laboriosam pariatur temporibus, voluptatum, voluptatem ullam voluptates officiis sint facilis commodi modi voluptas tempore esse deleniti exercitationem.",
            picture: null,
        },
        {
            id: new Date().getTime() + 1000,   //45641456156156
            date: new Date().toDateString(), //sat 23, julio
            text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio debitis esse consequatur reprehenderit fugit sint optio suscipit, impedit aliquam sed magni at vitae sit praesentium. Qui magni rerum minima quo!",
            picture: null,
        },
        {
            id: new Date().getTime() + 2000,   //45641456156156
            date: new Date().toDateString(), //sat 23, julio
            text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores, saepe quibusdam voluptas officia, enim ducimus iusto accusantium officiis iste porro nisi itaque esse repudiandae qui explicabo autem, error quasi dignissimos!",
            picture: null,
        },
    ]
})



<template>
    <h1>Posts</h1>
  

    <div>
        
    </div>


    <button class="btn btn-success mb-4" @click="getPosts">get posts from jsonplaceholder</button>
        <div class="row">
            <div v-for="post in posts" :key="post.id" class="card" style="width: 18rem;">
                <div class="card-body">
                    <h5 class="card-title">{{ post.title }}</h5>
                    <p class="card-text">{{ post.body }}</p>
                    <a href="#" class="btn btn-primary">more</a>
                </div>
            </div>
        </div>







        <!-- Button trigger modal -->
        <button type="button" class="btn btn-primary" @click="showModal">
        Launch demo modal
        </button>

        <!-- Modal -->
        <div class="modal fade" ref="exampleModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                ...
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary">Save changes</button>
            </div>
            </div>
        </div>
        </div>
  </template>
  
  <script>
  import { ref, reactive, onMounted } from "vue";
  import { Modal } from 'bootstrap'
  
  export default {
    name: "Posts",
  
    setup() {
      const posts = reactive([]);
      const exampleModal = ref(null);
      const modal = ref(null);
  
      const getPosts = () => {
        
        fetch('https://jsonplaceholder.typicode.com/posts')
          .then(res => res.json())
          .then(data => posts.push(...data))
      }

      const showModal = () => {
        modal.value.show();
      }

      onMounted(() => {
        modal.value = new Modal(exampleModal.value)
      })
  
      return {
        posts,
        getPosts,
        exampleModal,
        showModal
      };
    },
  
    // data: () => ({
    //   posts: [],
    //   modal: null
    // }),
    // methods: {
    //   getPosts() {
    //     fetch('https://jsonplaceholder.typicode.com/posts')
    //       .then(res => res.json())
    //       .then(data => this.posts = data)
    //     },
    //     showModal() {
    //         this.modal.show()
    //     }
    // },
    // mounted() {
    //     this.modal = new Modal(this.$refs.exampleModal)
    // }
  };
  </script>
  
  <style scoped>
  </style>
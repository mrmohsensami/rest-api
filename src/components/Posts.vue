<template>
    <h1>Posts</h1>

    <form @submit.prevent="isUpdating ? updatePostForm() : savePostForm()">
      <div class="mb-3">
        <label for="title" class="form-label">عنوان پست</label>
        <input type="text" class="form-control" id="title" v-model="postForm.title" />
      </div>
      <div class="mb-3">
        <label for="body" class="form-label">متن پست</label>
        <textarea class="form-control" id="body" rows="3" v-model="postForm.body"></textarea>
      </div>
      <button class="btn btn-info mb-4" type="submit">ارسال فرم</button>
    </form>


    <!-- <button class="btn btn-success mb-4" @click="getPosts">get posts from jsonplaceholder</button> -->
    <p class="alert alert-danger" v-if="errorText">{{ errorText }}</p>
        <div class="row">
            <div v-for="post in posts" :key="post.id" class="card" style="width: 18rem;">
                <div class="card-body">
                    <h5 class="card-title">{{ post.title }}</h5>
                    <p class="card-text">{{ post.body }}</p>
                    <a href="#" class="btn btn-primary" @click="showPostModal(post.id)">more</a>
                    <button class="btn btn-primary" @click="fetchUpdatePost(post.id)">edit</button>
                </div>
            </div>
        </div>


        <!-- Modal -->
        <div class="modal fade" ref="exampleModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">{{ post.title }}</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                {{ post.body }}
                <hr>
                user: {{ user.name }}
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
      const post = reactive({ title: '', body: '' });
      const postForm = reactive({ title: '', body: '', userId: 2 });
      const isUpdating = ref(false);
      const user = reactive({});
      const exampleModal = ref(null);
      const modal = ref(null);
      const errorText = ref('');

      const handleError = (res) => {
        if (! res.ok) {
          throw new Error('اررور داشتیم')
        }
        return res;
      }
  
      const getPosts = () => {
        fetch('https://jsonplaceholder.typicode.com/posts')
          .then(handleError)
          .then(res => res.json())
          .then(data => Object.assign(posts, data))
          .catch(error => errorText.value = error.message)
      }

      const showPostModal = (id) => {
        fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
          .then(handleError)
          .then(res => res.json())
          .then(data => {
            Object.assign(post, data)
            fetch(`https://jsonplaceholder.typicode.com/users/${data.userId}`)
              .then(handleError)
              .then(res => res.json())
              .then(data => {
                Object.assign(user, data)
                modal.value.show();
              })
            .catch(error => errorText.value = error.message)
          })
        .catch(error => errorText.value = error.message)
      }

      const savePostForm = () => {
        fetch('https://jsonplaceholder.typicode.com/posts', {
          method: 'post',
          headers: {
            'Content-type': 'application/json; charset: utf-8;'
          },
          body: JSON.stringify(postForm)
        })
        .then(handleError)
        .then(res => res.json())
        .then(data => {
          posts.push({
            id: data.id,

            ...postForm
          })

          postForm.title = ''
          postForm.body = ''
        })
        .catch(error => errorText.value = error.message)
      }

      const fetchUpdatePost = id => {
          isUpdating.value = true;

          fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
            .then(handleError)
            .then(res => res.json())
            .then(data => {
              postForm.id = data.id
              postForm.title = data.title
              postForm.body = data.body
              postForm.userId = data.userId
            })
            .catch(error => errorText.value = error.message)
        }

        const updatePostForm = () => {
            fetch(`https://jsonplaceholder.typicode.com/posts/${postForm.id}`, {
              method: 'put',
              headers: {
                'Content-type': 'application/json; charset: utf-8;'
              },
              body: JSON.stringify(postForm)
            })
            .then(handleError)
            .then(res => res.json())
            .then(data => {
              posts.map(post => {
                if (post.id === postForm.id) {
                  post.title = postForm.title
                  post.body = postForm.body
                }
              })

              postForm.title = ''
              postForm.body = ''
            })
            .catch(error => errorText.value = error.message)
          }

      getPosts();

      onMounted(() => {
        modal.value = new Modal(exampleModal.value)
      })
  
      return {
        posts,
        post,
        user,
        errorText,
        exampleModal,
        showPostModal,
        postForm,
        savePostForm,
        fetchUpdatePost,
        isUpdating,
        updatePostForm
      };
    },
  
    // data: () => ({
    //   posts: [],
    //   post: {},
    //   user: {},
    //   modal: null
    // }),
    // methods: {
    //   getPosts() {
    //     fetch('https://jsonplaceholder.typicode.com/posts')
    //       .then(res => res.json())
    //       .then(data => this.posts = data)
    //     },
    //     showPostModal(id) {
    //       fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
    //         .then(res => res.json())
    //         .then(data => {
    //           this.post = data

    //           fetch(`https://jsonplaceholder.typicode.com/users/${data.userId}`)
    //             .then(res => res.json())
    //             .then(data => {
    //               this.user = data
    //               this.modal.show()
    //             })
    //         })
    //     }
    // },
    // mounted() {
    //     this.modal = new Modal(this.$refs.exampleModal)
    // }
  };
  </script>
  
  <style scoped>
  </style>
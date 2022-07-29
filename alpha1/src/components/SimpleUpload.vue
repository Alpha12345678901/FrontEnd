<template>
  <div class="file">
   <form @submit.prevent="onSubmit" enctype="multipart/form-data">
      <div class="fields">
        <label>Upload File</label><br/>
        <input
          type="file"
          ref="file"
          @change="onSelect"
        />
      </div>
      <div class="fields">
        <button>Submit</button>
      </div>
      <div class="message">
        <h5>{{message}}</h5>
      </div>
   </form>
   <ul>
       <li v-for="AI in AiList[0]" :key="AI">{{AI}}</li>
   </ul>
  </div>
</template>
<script>
import axios from 'axios';
import {
  getAuth
} from "firebase/auth";
export default {
  name: 'FileUpload',
  data() {
    return {
      file:"",
      message:"",
      CurrentAI:"",
      AiList:[]
    }
  },
mounted(){
          axios.get('http://localhost:3000/ListUserAI?name='+getAuth().currentUser.email).then((data)=>{
              this.AiList=data.data;
          })

      },
  methods: {

    onSelect(){
      const file = this.$refs.file.files[0];
      this.file = file;
    },
    async onSubmit(){
      const formData = new FormData();
        console.log(this.file);
      formData.append('file',this.file);
    formData.append('properName',getAuth().currentUser.email);
      try{
        await axios.post('http://localhost:3000/uploadAI?name='+getAuth().currentUser.email,formData);
        this.message = 'Uploaded!!'
      }
      catch(err){
        console.log(err);
        this.message = err.response.data.error
      }
        console.log(getAuth().currentUser.email);
    }
  },
}
</script>

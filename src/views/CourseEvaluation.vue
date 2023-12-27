<template>
  <div class="container-xxl d-flex justify-content-center">
    <div class="container d-flex justify-content-center flex-column col-md-2 mt-5">
      <button class="btn btn-primary mt-1" :class="{ 'btn-selected': selectedYear === 1 }" @click="fetchCourses(1)">First Year</button>
      <button class="btn btn-primary mt-1" :class="{ 'btn-selected': selectedYear === 2 }" @click="fetchCourses(2)">Second Year</button>
      <button class="btn btn-primary mt-1" :class="{ 'btn-selected': selectedYear === 3 }" @click="fetchCourses(3)">Third Year</button>
      <button class="btn btn-primary mt-1" :class="{ 'btn-selected': selectedYear === 4 }" @click="fetchCourses(4)">Fourth Year</button>
    </div>
    <div class="col-md-10">
      <table class="table">
        <thead>
        <tr>
          <th scope="col">Course Name</th>
          <th scope="col">Course Teacher</th>
          <th scope="col">Result</th>
          <th scope="col">Action</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(course, index) in courses" :key="index">
          <td>{{ course.Course_Name }}</td>
          <td>{{ course.Course_Teacher }}</td>
          <td>{{ course.Vote_Result }}</td>
          <td><button class="btn btn-primary" @click="vote(course.Course_Id)">Oyla</button> </td>
        </tr>
        </tbody>
      </table>
      <button class="btn btn-primary" @click="this.$router.push({name:'control-panel'})">Ana sayfa</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      courses: [],
      selectedYear: 1, // Default selected year is the first year

    }
  },
  methods: {
    async fetchCourses(yearId) {
      try {
        const response = await axios.get(`http://localhost:3001/courses-by-year/${yearId}`);
        console.log(response.data);
        this.courses = response.data.courses;
        this.selectedYear = yearId; // Update the selected year
      } catch (error) {
        console.error(error);
        // Handle error, show a message to the user, etc.
      }
    },
    vote(courseId){
      this.$router.push({ name: 'vote-menu', params: {courseId: courseId} });
    }
  },
  created() {
    // Fetch courses for the first year when the component is created
    this.fetchCourses(1);
  }
}
</script>

<style scoped>
/* Add any scoped styles if needed */

/* Style for the selected button */
.btn-selected {
  background-color: yellowgreen;
}
</style>

<template>
  <h1 class="text-center">Vote Menu</h1>

  <div class="container-xxl d-flex justify-content-center align-items-center mt-5 flex-column">
    <div class="border border-2 rounded-4 col-md-6">
      <h3 class="text-center">{{ course.Course_Name }}</h3>
      <h6 class="text-center">{{ course.Course_Teacher }}</h6>
    </div>
    <div class="border border-2 col-md-5 mt-1">
      <h3 class="text-center">Give an overall score for our teacher</h3>
    </div>
    <form @submit.prevent="submitForm">
      <!-- Radio buttons generated using v-for loop -->
      <div v-for="option in options" :key="option.value" class="form-check form-check-inline">
        <input v-model="selectedOption" class="form-check-input" type="radio" :value="option.value">
        <label class="form-check-label">{{ option.label }}</label>
      </div>

      <!-- Checkbox for confirmation -->
      <div class="form-check">
        <input v-model="confirmation" class="form-check-input" type="checkbox" id="flexCheckDefault">
        <label class="form-check-label" for="flexCheckDefault">I confirm my rating</label>
      </div>

      <!-- Submit button -->
      <div class="mt-5">
        <button type="submit" class="btn btn-primary">Vote</button>
      </div>
    </form>

  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      selectedOption: '', // To store the selected radio option
      confirmation: false, // To store the confirmation checkbox value
      options: [
        { value: 1, label: 'One' },
        { value: 2, label: 'Two' },
        { value: 3, label: 'Three' },
        { value: 4, label: 'Four' },
        { value: 5, label: 'Five' }
      ],
      course: {} // To store course details
    };
  },
  methods: {
    async submitForm() {
      if (!this.selectedOption || !this.confirmation) {
        alert("Please select an option and confirm your rating.");
        return;
      }

      try {
        const courseId = this.$route.params.courseId;
        const rating = this.selectedOption // Assuming the value is a number
        console.log(courseId,rating)
        // Make a POST request to the '/vote-course' endpoint
        alert("please wait until you are redirected to courses")
        const response = await axios.post('http://localhost:3001/vote-course', {
          courseId,
          rating
        });

        if (response.data.message === 'Course voted successfully.') {
          // Optionally, you can handle success (e.g., show a success message to the user)
          console.log('Vote submitted successfully!');
          this.$router.push({ name: 'course-evaluation' });
        } else {
          // Handle the case where the server response is not as expected
          console.error('Unexpected server response:', response.data);
          // You might want to show an error message to the user
        }
      } catch (error) {
        // Handle error, show a message to the user, etc.
        console.error('Error submitting vote:', error);
      }
    },
    async fetchCourse() {
      try {
        // Replace 'your_course_id' with the actual course ID you want to fetch
        const courseId = this.$route.params.courseId;
        const response = await axios.get(`http://localhost:3001/course/${courseId}`);
        if (!response.data.course) {
          throw new Error(`Course not found for Course_Id: ${courseId}`);
        }
        this.course = response.data.course;
      } catch (error) {
        console.error(error);
        // Handle error, show a message to the user, etc.
      }
    }
  },
  created() {
    // Fetch course details when the component is created
    this.fetchCourse();
  }
};
</script>

<style scoped>

</style>

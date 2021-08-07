<template>
  <div class="container">
    <div class="row p-3">
      <!-- Account Info -->
      <div class="col col-md-3">
        <div class="card">
          <div class="card-body p-4">
            <div class="d-flex align-items center">
              <div class="personal-avatar" :style="{backgroundImage: `url('${userInfo.avatarUrl}')`}">
                <i class="bx bxs-circle bx-border-circle p-0"></i>
              </div>
              <div>
                <p
                  class="fw-bold fs-5 text-dark text-truncate mb-1"
                  style="max-width: 150px">
                  {{userInfo.fullName ? userInfo.fullName : "Chưa cập nhật"}}
                </p>
                <p class="text-muted">Admin</p>
              </div>
            </div>
            <div class="pt-4">
              <div class="d-flex align-items-center mb-2 text-muted">
                <span class="flex-shrink-0 me-2">
                  <i class="bx bxs-phone-call fs-4"></i>
                </span>
                <span>{{userInfo.phoneNumber ? userInfo.phoneNumber : "Chưa cập nhật"}}</span>
              </div>
              <div class="d-flex align-items-center mb-2 text-muted">
                <span class="flex-shrink-0 me-2">
                  <i class="bx bxs-envelope fs-4"></i>
                </span>
                <span>{{userInfo.email ? userInfo.email : "Chưa cập nhật"}}</span>
              </div>
              <div class="d-flex align-items-center mb-2 text-muted">
                <span class="flex-shrink-0 me-2">
                  <i class="bx bxs-been-here fs-4"></i>
                </span>
                <span>{{userInfo.address ? userInfo.address : "Chưa cập nhật"}}</span>
              </div>
              <div class="d-flex align-items-center mb-2 text-muted">
                <span class="flex-shrink-0 me-2">
                  <i class="bx bxs-calendar-event fs-4"></i>
                </span>
                <span>{{userInfo.dayOfBirth ? userInfo.dayOfBirth : "Chưa cập nhật"}}</span>
              </div>
              <button
                class="btn btn-primary mt-3 w-100"
                @click="isChangePassword = true"
              >
                Change password
              </button>
              <button
                class="btn btn-primary mt-3 w-100"
                @click="isChangePassword = false"
              >
                Change personal info
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Form change account info -->
      <div class="col col-md-9">
        <div class="card rounded" v-if="!isChangePassword">
          <div
            class="card-header d-flex justify-content-center align-items-center bg-white"
          >
            <div class="col-auto me-auto">
              <h5>Personal Infomation</h5>
              <small>Update your personal setting</small>
            </div>
            <div class="col-auto">
              <button class="btn btn-primary me-2" @click="updateInfo">
                <span v-if="!isLoader">Save changes</span>
                <div class="spinner-border text-light" role="status" style="font-size: .9rem" v-else>
                  <span class="visually-hidden">Loading...</span>
                </div>
              </button>
              <button class="btn btn-secondary">Cancel</button>
            </div>
          </div>
          <div class="card-body">
            <div class="row">
              <label class="col-xl-3"></label>
              <div class="col-sm-9 col-xl-6">
                <h5 class="font-weight-bold mb-6">Customer Info:</h5>
              </div>
            </div>
            <div class="form-group row">
              <label class="col-xl-3 col-sm-3 col-form-label text-end"
                >Photo</label
              >
              <div class="col-sm-9 col-xl-6">
                <div class="image-input" :style="{backgroundImage: `url('${pickUrl}')`}">
                  <label class="edit-photo-btn">
                    <i class="bx bx-pencil bx-border-circle bg-white"></i>
                    <input type="file" accept=".png, .jpg, jpeg" @change="previewImage"/>
                  </label>
                </div>
              </div>
            </div>
            <div class="form-group row">
              <label class="col-xl-3 col-sm-3 col-form-label text-end">Full name</label>
              <div class="col-sm-9 col-xl-6">
                <input
                  type="text"
                  class="form-control form-control-sm form-control-solid"
                  v-model="personalParams.fullName"
                  placeholder="Lam Ngoc Huy"
                />
              </div>
            </div>
            <div class="form-group row">
              <label class="col-xl-3 col-sm-3 col-form-label text-end">Email Address</label>
              <div class="col-sm-9 col-xl-6">
                <input
                  type="text"
                  class="form-control form-control-sm form-control-solid"
                  :value="userInfo.email"
                  placeholder="Eg. abc@gmail.com"
                  readonly
                />
              </div>
            </div>
            <div class="form-group row">
              <label class="col-xl-3 col-sm-3 col-form-label text-end">Phone number</label>
              <div class="col-sm-9 col-xl-6">
                <input
                  type="text"
                  class="form-control form-control-sm form-control-solid"
                  v-model="personalParams.phoneNumber"
                  placeholder="+84xxxxxxxxx"
                />
              </div>
            </div>
            <div class="form-group row">
              <label class="col-xl-3 col-sm-3 col-form-label text-end">Address</label>
              <div class="col-sm-9 col-xl-6">
                <input
                  type="text"
                  class="form-control form-control-sm form-control-solid"
                  v-model="personalParams.address"
                  placeholder="1st abc Street"
                />
              </div>
            </div>
            <div class="form-group row">
              <label class="col-xl-3 col-sm-3 col-form-label text-end">Day of Birth</label>
              <div class="col-sm-9 col-xl-6">
                <input
                  type="datetime-local"
                  class="form-control form-control-sm form-control-solid"
                  v-model="personalParams.dayOfBirth"
                  placeholder="2018-06-12T19:30"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="card rounded" v-else>
          <div
            class="card-header d-flex justify-content-center align-items-center bg-white"
          >
            <div class="col-auto me-auto">
              <h5>Change Password</h5>
              <small>Change your account password</small>
            </div>
            <div class="col-auto">
              <button class="btn btn-primary me-2">Save changes</button>
              <button class="btn btn-secondary">Cancel</button>
            </div>
          </div>
          <div class="card-body">
            <div class="form-group row">
              <label class="col-xl-3 col-sm-3 col-form-label text-end">Current Password</label>
              <div class="col-sm-9 col-xl-6">
                <input
                  type="text"
                  class="form-control form-control-sm form-control-solid"
                  placeholder="Current password"
                />
              </div>
            </div>
            <div class="form-group row">
              <label class="col-xl-3 col-sm-3 col-form-label text-end"
                >New Password</label
              >
              <div class="col-sm-9 col-xl-6">
                <input
                  type="text"
                  class="form-control form-control-sm form-control-solid"
                  placeholder="New password"
                />
              </div>
            </div>
            <div class="form-group row">
              <label class="col-xl-3 col-sm-3 col-form-label text-end"
                >Verify Password</label
              >
              <div class="col-sm-9 col-xl-6">
                <input
                  type="text"
                  class="form-control form-control-sm form-control-solid"
                  placeholder="Verify Password"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase';
import { mapActions, mapGetters } from 'vuex';
export default {
  name: "AdminProfile",
  data() {
    return {
      imageData: null,
      pickUrl: null,
      isChangePassword: false,
      personalParams: {
        id: localStorage.getItem("adminId"),
        email: null,
        fullName: null,
        address: null,
        phoneNumber: null,
        avatarUrl: null,
        shopName: null,
        dayOfBirth: null,
        roles: null,
        status: true
      }
    };
  },
  computed: {
    ...mapGetters({
      userInfo: "auth/userInfo",
      isLoader: "loader/isLoader"
    })
  },
  methods: {
    ...mapActions({
      changePersonalInfo: "auth/changePersonalInfo",
      getPersonalAdminInfo: "auth/getPersonalAdminInfo",
      showLoader: "loader/showLoader"
    }),
    previewImage(event) {
      let input = event.target;
      this.imageData = event.target.files[0];
      if (input.files && input.files[0]) {
        let reader = new FileReader();
        reader.onload = (e) => {
          this.pickUrl = e.target.result;
        };
        reader.readAsDataURL(input.files[0]);
      }
    },
    updateInfo() {
      if (this.imageData==null) {
        this.changePersonalInfo(this.personalParams);
      } else {
        this.showLoader();
        const storageRef=firebase.storage().ref(`${this.imageData.name}`).put(this.imageData);
        storageRef.on(`state_changed`,snapshot=>{
          this.uploadValue = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
        }, error=>{
          console.log(error.message);
        },
        ()=>{
          storageRef.snapshot.ref.getDownloadURL().then((url)=>{
            this.personalParams.avatarUrl = url;
            this.changePersonalInfo(this.personalParams);
          });
        }
        );
      }
    }
  },
  created() {
    this.personalParams = this.userInfo;
    this.pickUrl = this.userInfo.avatarUrl;
  },
};
</script>

<style scoped>
label {
  font-weight: 300 !important;
}

.image-input,
.personal-avatar {
  position: relative;
  display: inline-block;
  width: 100px;
  height: 100px;
  border: 3px solid #fff;
  box-shadow: 0 0.5rem 1.5rem 0.5rem rgba(0, 0, 0, 0.08);
  border-radius: 0.42rem;
  background-repeat: no-repeat;
  background-size: cover;
}

.personal-avatar {
  border: none;
  box-shadow: none;
  margin-right: 1.25rem;
  width: 60px;
  height: 60px;
}

.personal-avatar > i {
  position: absolute;
  top: -5px;
  right: -5px;
  color: #32e08f !important;
  background: #fff;
  border-color: #fff;
}

.edit-photo-btn {
  position: absolute;
  right: -10px;
  top: -10px;
  cursor: pointer;
}

input[type="file"] {
  visibility: hidden;
  width: 0 !important;
  height: 0 !important;
  overflow: hidden;
  opacity: 0;
}
</style>

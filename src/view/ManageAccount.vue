<template>
  <div class="container">
    <div class="row">
      <div class="col col-sm-9">
        <div class="card">
          <div class="card-body">
            <div class="card-title">
              <h5>Danh sách tài khoản người dùng</h5>
              <small>Quản lí tài khoản</small>
            </div>
            <div class="table-responsive">
              <table class="table table-hover">
                <thead class="text-uppercase">
                  <tr>
                    <th>#</th>
                    <th>Personal Info</th>
                    <th>Address</th>
                    <th class="text-center">Status</th>
                    <th class="text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(account, index) in accountsPagination"
                    :key="index"
                  >
                    <td>{{ index + 1 + (accountPageAt - 1) * limit }}</td>
                    <td style="width: 350px">
                      <div class="d-flex align-items-center">
                        <div class="symbol symbol-40 symbol-sm flex-shrink-0">
                          <img
                            v-if="account.avatarUrl"
                            :src="account.avatarUrl"
                            width="40px"
                            height="40px"/>
                          <img 
                            v-else
                            src="../assets/l60Hf.png"
                            width="40px" 
                            height="40px">
                        </div>
                        <div class="ms-4">
                          <div
                            class="text-dark-75 font-weight-bolder font-size-lg mb-0">
                            {{ account.fullName ? account.fullName : "Chưa cập nhật"}}
                          </div>
                          <a
                            class="text-muted font-weight-bold text-hover-primary"
                            >{{ account.email ? account.email : "Chưa cập nhật"}}</a>
                        </div>
                      </div>
                    </td>
                    <td>{{ account.address ? account.address : "Chưa cập nhật"}}</td>
                    <td class="text-center">
                      <span class="badge badge-active" v-if="account.status">Active</span>
                      <span class="badge badge-inactive" v-else>Inactive</span>
                    </td>
                    <td class="text-center">
                      <i class='bx bx-show-alt' 
                          @click="viewInfo(account)"
                          v-tooltip="{content: 'View Info'}"></i>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <div class="row">
              <div class="col-auto me-auto">
                <ul class="pagination d-flex flex-row mb-0">
                  <li>
                    <a @click="accountPageAt - 1" :disabled="accountPageAt == 1"
                      >Prev</a>
                  </li>
                  <div class="d-flex">
                    <div v-for="(num, index) in paginationArr" :key="index">
                      <li>
                        <a
                          @click="accountPageAt = num"
                          :disabled="num == accountPageAt"
                          >{{ num }}</a>
                      </li>
                    </div>
                  </div>
                  <li>
                    <a
                      @click="accountPageAt + 1"
                      :disabled="accountPageAt == accountTotalPage"
                      >Next</a>
                  </li>
                </ul>
              </div>
              <div class="col-auto col-3 d-flex flex-row">
                <div class="col align-self-center">
                  <select class="form-control" v-model="limit">
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
                  </select>
                </div>

                <p class="mb-0 ms-3 align-self-center">
                  Showing {{ (accountPageAt - 1) * limit + 1 }} -
                  {{ accountPageAt * limit }} of {{ this.allAccounts.length }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- User Info Card -->
      <div class="col col-md-3">
        <div class="card">
          <div class="card-body p-4" v-if="userInfo!=null">
            <div class="d-flex align-items center">
              <img v-if="userInfo.avatarUrl" :src="userInfo.avatarUrl" class="personal-avatar" alt="" width="60px" height="60px">
              <img v-else src="../assets/l60Hf.png" class="personal-avatar" alt="" width="60px" height="60px">
              <div>
                <p
                  class="fw-bold fs-5 text-dark text-truncate mb-1"
                  style="max-width: 150px">
                  {{userInfo.fullName || userInfo ? userInfo.fullName : "Chưa cập nhật"}}
                </p>
                <p class="text-muted">User</p>
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
              <button class="btn btn-primary mt-3 w-100" @click="toggleUpdateRolesModal">Update roles</button>
              <button
                v-if="!userInfo.status"
                class="btn btn-primary mt-3 w-100 btn-lock"
                @click="unlockAccount(userInfo.id); userInfo.status = true"
                v-tooltip.bottom="{content: 'Unlock this account'}"
              >
                <i class='bx bx-lock' v-if="!isLoader"></i>
                <div class="spinner-border text-light" role="status" style="font-size: .9rem" v-else>
                  <span class="visually-hidden">Loading...</span>
                </div>
              </button>
              <button
                v-else
                class="btn btn-primary mt-3 w-100 btn-unlock"
                @click="lockAccount(userInfo.id); userInfo.status = false"
                v-tooltip.bottom="{content: 'Lock this account'}"
              >
                <i class='bx bx-lock-open' v-if="!isLoader"></i>
                <div class="spinner-border text-light" role="status" style="font-size: .9rem" v-else>
                  <span class="visually-hidden">Loading...</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
      <!-- Update roles Modal -->
      <div id="updateRolesModal">
        <div class="content">
          <h6>Choose roles for {{userInfo ? userInfo.fullName : ""}}</h6>
          <div id="chooseRolesTab">
            <div class="checkbox">
              <label v-for="role in allRoles" :key="role.id">
                <input
                  type="checkbox"
                  :value="{ id: role.id, roleName: role.roleName }"
                  v-model="listRolesParam"
                />
                <span>
                  <p>
                    {{ role.roleName }}
                  </p>
                </span>
              </label>
            </div>
          </div>
        </div>
        <div class="footer">
          <button
            class="btn btn-primary"
            @click="saveRolesChange"
            v-bind:disabled="
              listRolesParam.length == 0 ||
              listRolesParam == userInfo.roles
            "
          >
            <span v-if="!isLoader">Save changes</span>
            <div class="spinner-border text-light" role="status" style="font-size: .9rem" v-else>
              <span class="visually-hidden">Loading...</span>
            </div>
          </button>
        </div>
        <a class="close-btn" @click="toggleUpdateRolesModal">
          <i class="bx bx-x"></i>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      limit: 5,
      accountPageAt: 1,
      userInfo: null,
      listRolesParam: []
    };
  },
  computed: {
    ...mapGetters({
      allAccounts: "account/allAccounts",
      isLoader: "loader/isLoader",
      allRoles: "role/allRoles",
    }),
    paginationArr() {
      if (this.accountTotalPage <= 5)
        return this.range(1, this.accountTotalPage);
      else if (this.accountPageAt <= 3) return this.range(1, 5);
      else if (this.accountPageAt >= this.accountTotalPage - 2)
        return this.range(this.accountPageAt - 2, this.accountTotalPage);
      else return this.range(this.accountPageAt - 2, this.accountPageAt + 2);
    },
    accountTotalPage() {
      return parseInt(Object.keys(this.allAccounts).length / this.limit) + 1;
    },
    accountsPagination() {
      return this.allAccounts.filter(
        (element, index) =>
          index >= (this.accountPageAt - 1) * this.limit &&
          index <= this.accountPageAt * this.limit - 1
      );
    },
  },
  methods: {
    ...mapActions({
      lockAccount: "account/lockAccount",
      unlockAccount: "account/unlockAccount",
      updateRolesForUser: "account/updateRolesForUser"
    }),
    range(start, end) {
      return Array(end - start + 1)
        .fill()
        .map((_, idx) => start + idx);
    },
    viewInfo(data) {
      this.userInfo = data;
      this.listRolesParam = this.userInfo.roles;
    },
    toggleUpdateRolesModal() {
      document.getElementById("updateRolesModal").classList.toggle("active");
    },
    saveRolesChange() {
      this.updateRolesForUser(
        {
          id: this.userInfo.id,
          params: this.listRolesParam
        }
      );
    }
  },
  created() {
    
  },
};
</script>

<style scoped>
select {
  padding: 2px 0 0 16px !important;
  width: 50px;
  height: 35px;
  cursor: pointer;
}
.container {
  height: 100vh;
  overflow-y: auto;
  padding: 20px 25px;
}

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
  background-image: url("../assets/l60Hf.png");
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

.card-body {
  padding: 30px 20px;
}
.card-title {
  font-weight: 600 !important;
  margin-bottom: 30px;
}

.card-title > small {
  color: #b5b5c3 !important;
  font-size: 0.8rem;
}

button > i {
  font-size: 20px !important;
}

.btn-lock {
  background: #f64e60 !important;
}

.btn-unlock {
  background: #1bc5bd !important;
}

#updateRolesModal {
  position: fixed;
  top: -100%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
  background: #fff;
  width: 300px;
  max-height: 550px;
  padding: 20px;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.08);
  transition: 0.5s;
  visibility: hidden;
}

#updateRolesModal .content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;
}

#chooseRolesTab {
  max-height: 200px;
  overflow-y: auto;
}

#chooseRolesTab .checkbox label {
  position: relative;
  cursor: pointer;
  width: 100%;
}

#chooseRolesTab .checkbox input[type="checkbox"] {
  display: none;
}

#chooseRolesTab .checkbox label span {
  width: 100%;
  height: 40px;
  position: relative;
  display: inline-block;
  background: #fff;
  padding: 8px 15px;
  color: #000;
  border-radius: 10px;
  border: 2px solid #dfe2e6;
  font-size: 1rem;
  user-select: none;
  overflow: hidden;
}

#chooseRolesTab .checkbox label span p {
  border: none;
  margin: 0 !important;
}

#chooseRolesTab .checkbox label span::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 50%;
  background: rgba(255, 255, 255, 0.1);
}

#chooseRolesTab .checkbox label input[type="checkbox"]:checked ~ span {
  color: #c80064;
  background: rgb(255, 247, 248);
  border-color: #c80064;
}

#updateRolesModal .footer {
  display: flex;
  flex-direction: row-reverse;
  margin-top: 5px;
}

#updateRolesModal .close-btn {
  font-size: 20px;
  color: #333;
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
}

#updateRolesModal.active {
  top: 50%;
  visibility: visible;
}
</style>

<template>
  <div class="container">
    <div class="row mt-3">
      <!-- List Role -->
      <div class="col col-sm-5">
        <div class="card">
          <div class="card-body">
            <div class="card-title">
              <h5>Roles</h5>
            </div>
            <div class="table-responsive">
              <table class="table table-sm table-bordered">
                <thead class="text-uppercase">
                  <tr>
                    <th>Role name</th>
                    <th>Permissons</th>
                    <th class="text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(role, index) in allRoles" :key="index" >
                    <td>{{role.roleName}}</td>
                    <td>{{role.permissions.length}}</td>
                    <td class="text-center">
                      <i
                        class="bx bxs-pencil"
                        @click="editPermission(role)"
                        v-tooltip="{ content: 'Edit Permission' }"
                      ></i>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <!-- List Permission of Role -->
      <div class="col col-sm-7">
        <div class="card">
          <div class="card-body">
            <div class="card-title">
              <h5>Permissions Of <span style="color: #fd9644; font-size: 1.5rem !important">{{roleParams.roleName}}</span></h5>
            </div>
            <div class="table-responsive">
              <table class="table table-sm table-bordered">
                <thead class="text-uppercase">
                  <tr>
                    <th>Name</th>
                    <th>Description</th>
                    <th class="text-center">Allowed</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(permission, index) in allPermissions" :key="index">
                    <td>{{permission.permissionName}}</td>
                    <td>{{permission.description}}</td>
                    <td class="d-flex align-items-center justify-content-center">
                      <div class="toggle-btn">
                       <input type="checkbox" v-model="roleParams.permissions" :value="permission.id" name="abc" />
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <button class="btn btn-primary me-2" @click="saveChange">
              <span v-if="!isLoader">Save changes</span>
              <div class="spinner-border text-light" role="status" style="font-size: .9rem" v-else>
                <span class="visually-hidden">Loading...</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
  name: "ManageRole",
  data() {
    return {
      roleParams: {
        id: null,
        roleName: null,
        permissions: []
      },
    }
  },
  computed: {
    ...mapGetters({
      isLoader: "loader/isLoader",
      allRoles: "role/allRoles",
      allPermissions: "role/allPermissions",
    })
  },
  methods: {
    ...mapActions({
      updateRole: "role/updateRole",
    }),
    editPermission(role) {
      for (let i = 0; i < role.permissions.length; i++) {
        this.roleParams.permissions.push(role.permissions[i].id);
      }
      this.roleParams.id = role.id;
      this.roleParams.roleName = role.roleName;
    },
    saveChange()  {
      let params = {
        permissions: []
      };
      for (let i = 0; i < this.roleParams.permissions.length; i++) 
      {
        params.permissions.push({id: this.roleParams.permissions[i]}); 
      }
      this.updateRole({
        params: params,
        id: this.roleParams.id,
      });
    }
  }
};
</script>

<style scoped>
.permission-allowed {
  background: #1bc5bd;
  color: white;
}

.card-title > h5 {
  font-size: 1.4rem !important;
}

.toggle-icon {
  font-size: 2.5rem !important;
}

.toggle-btn {
  width: 45px;
  height: 24px;
  position: relative;
  border-radius: 50px;
  background: #2ecc71;
}

input[type="checkbox"] {
  position: absolute;
  left: 0%;
  width: 100%;
  height: 100%;
  cursor: pointer;
  appearance: none;
  -webkit-appearance: none;
}

input[type="checkbox"]::before {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90%;
  height: 75%;
  background: rgb(255, 255, 255);
  border-radius: 50px;
}

input[type="checkbox"]::after {
  content: "";
  position: absolute;
  top: 50%;
  transform: translate(5px, -50%);
  width: 15px;
  height: 15px;
  background: #2ecc71;
  opacity: 0.4;
  border-radius: 50px;
  transition: all 0.4s;
}

input:checked::after {
  transform: translate(170%, -50%);
  opacity: 1;
}
</style>

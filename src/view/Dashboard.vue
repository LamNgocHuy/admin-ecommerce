<template>
  <div class="container">
    <div class="row">
      <div class="col-12 col-md-6 mb-4">
        <div class="card bg-white">
          <div class="card-body py-4">
            <div class="d-flex align-items-start">
              <div class="flex-grow-1">
                <h3 class="mb-2">
                  {{overview ? overview.countAccount : "0"}}
                </h3>
                <small class="text-muted mb-2">Số lượng người dùng</small>
              </div>
              <div class="d-inline-block ms-3 icon-card">
                <i class="bx bx-user bx-border-circle"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-12 col-md-6 mb-4">
        <div class="card bg-white">
          <div class="card-body py-4">
            <div class="d-flex align-items-start">
              <div class="flex-grow-1">
                <h3 class="mb-2">
                  {{overview ? overview.countShop : "0"}}
                </h3>
                <small class="text-muted mb-2">Số lượng cửa hàng</small>
              </div>
              <div class="d-inline-block ms-3 icon-card">
                <i class="bx bx-store bx-border-circle"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-12 col-md-6 mb-4">
        <div class="card bg-white">
          <div class="card-body py-4">
            <div class="d-flex align-items-start">
              <div class="flex-grow-1">
                <h3 class="mb-2">
                  {{overview ? overview.sumAllRevenue : "0"}}
                </h3>
                <small class="text-muted mb-2">Tổng doanh thu</small>
              </div>
              <div class="d-inline-block ms-3 icon-card">
                <i class="bx bx-money bx-border-circle"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-12 col-md-6 mb-4">
        <div class="card bg-white">
          <div class="card-body py-4">
            <div class="d-flex align-items-start">
              <div class="flex-grow-1">
                <h3 class="mb-2">
                  {{overview ? overview.countProduct : "0"}}
                </h3>
                <small class="text-muted mb-2">Tổng sản phẩm</small>
              </div>
              <div class="d-inline-block ms-3 icon-card">
                <i class="bx bx-package bx-border-circle"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Top 5 revenue shop -->
    <div class="row mb-3">
      <div class="col">
        <div class="card">
          <div class="card-body">
            <div class="card-title">
              <h5>Top 5 doanh thu</h5>
              <small>Trong tháng {{new Date().getMonth()+1}}</small>
            </div>
            <div class="table-responsive">
              <table class="table table-sm">
                <thead class="text-uppercase">
                  <tr>
                    <th>#</th>
                    <th>Shop</th>
                    <th>Owner</th>
                    <th>Revenue</th>
                    <th>Sold products</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(shop, index) in allShopRevenue" :key="index">
                    <td>{{ index }}</td>
                    <td style="width: 350px">
                      <div class="d-flex align-items-center">
                        <div class="symbol symbol-40 symbol-sm flex-shrink-0">
                          <img
                            class=""
                            :src="shop.logo"
                            alt="photo"
                            width="40px"
                            height="40px"
                          />
                        </div>
                        <div class="ms-4">
                          <div
                            class="text-dark-75 font-weight-bolder font-size-lg mb-0"
                          >
                            {{ shop.shopName }}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>{{ shop.ownerName}}</td>
                    <td>{{ shop.revenue }}</td>
                    <td>
                      {{ shop.quantitySell }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Top 5 best sell product -->
    <div class="row">
      <div class="col">
        <div class="card">
          <div class="card-body">
            <div class="card-title">
              <h5>Top 5 sản phảm bán chạy</h5>
              <small>Trong tháng {{new Date().getMonth()+1}}</small>
            </div>
            <div class="table-responsive">
              <table class="table table-sm">
                <thead class="text-uppercase">
                  <tr>
                    <th>#</th>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Category</th>
                    <th>Sold quantity</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(product, index) in allProducts" :key="index">
                    <td>{{ index }}</td>
                    <td style="width: 350px">
                      <div class="d-flex align-items-center">
                        <div class="symbol symbol-40 symbol-sm flex-shrink-0">
                          <img
                            class=""
                            :src="product.productThumbnail"
                            alt="photo"
                            width="40px"
                            height="40px"
                          />
                        </div>
                        <div class="ms-4">
                          <div
                            class="text-dark-75 font-weight-bolder font-size-lg mb-0"
                          >
                            {{ product.productName }}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>{{ product.productPrice}}</td>
                    <td>{{ product.categoryName }} / {{product.subcategoryName}}</td>
                    <td>
                      {{product.soldQuantity}}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
  data() {
    return {
      
    };
  },
  computed: {
    ...mapGetters({
      allShopRevenue: "shop/allShopRevenue",
      overview: "shop/overview",
      allProducts: "product/allProducts"
    })
  },
  methods: {
    ...mapActions({
      getAllShopRevenue: "shop/getAllShopRevenue",
      getAllProducts: "product/getAllProducts"
    })
  },
};
</script>

<style scoped>
.container {
  height: 100vh;
  overflow-y: auto;
  padding: 20px 25px;
}

.icon-card > i {
  font-size: 24px;
  background: #e0eafc;
  color: #3f80ea;
  border: 0;
  padding: 10px;
}

select {
  padding: 2px 0 0 16px !important;
  width: 50px;
  height: 35px;
  cursor: pointer;
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
</style>

class ApiUrl{


    static baseUrl="http://127.0.0.1:8000/api/"
    static getVisitorDetails=this.baseUrl+"getVisitorDetails"
    static sendContactDetails=this.baseUrl+"sendContactDetails"
    static sendSiteInfo=this.baseUrl+"sendSiteInfo"
    static sendCategoryDetails=this.baseUrl+"sendCategoryDetails"



    static productListByRemark(remark){
      return this.baseUrl+"productListByRemark/"+remark;

    }
    static productListByCategory(category){
        return this.baseUrl+"productListByCategory/"+category;
  
      }
      static productListBySubcategory(category,subcategory){
        return this.baseUrl+"productListBySubcategory/"+category+"/"+subcategory;
      }
      static sendSliderInfo=this.baseUrl+"sendSliderInfo";

      static ProductDetails(code){
        return this.baseUrl+"ProductDetails/"+code;
  
      }
      static ProductList(code){
        return this.baseUrl+"ProductList/"+code;
  
      }
      static NotificationHistory=this.baseUrl+"NotificationHistory";
      static NotificationHistoryCount=this.baseUrl+"NotificationHistoryCount";
      static NotificationHistoryRead=this.baseUrl+"NotificationHistoryRead";

      static SearchByProduct(searchKey){
        return this.baseUrl+"SearchByProduct/"+searchKey;
  
      }
      static createOtp(mobile){
        return this.baseUrl+"createOtp/"+mobile;
    }
      static OtpVerification=this.baseUrl+"OtpVerification";

      static similarProduct(subcategory){
        return this.baseUrl+"similarProduct/"+subcategory;
    }
    static reviewList(code){
      return this.baseUrl+"reviewList/"+code;
  }
  static AddToCart=this.baseUrl+"AddToCart";
  
  static CartCount(mobile){
    return this.baseUrl+"CartCount/"+mobile;
}

static AddToFavourite(code,mobile){
  return this.baseUrl+"AddToFavourite/"+code+"/"+mobile;
}

static FavouriteList(mobile){
  return this.baseUrl+"FavouriteList/"+mobile;
}

static removeCartItem(id){
  return this.baseUrl+"removeCartItem/"+id;
}

static CartList(mobile){
  return this.baseUrl+"CartList/"+mobile;
}

static removeFavItem(code,mobile){
  return this.baseUrl+"removeFavItem/"+code+"/"+mobile;
}
static CartItemPlus(id,quantity,price){
  return this.baseUrl+"CartItemPlus/"+id+"/"+quantity+"/"+price;
}
static CartItemMinus(id,quantity,price){
  return this.baseUrl+"CartItemMinus/"+id+"/"+quantity+"/"+price;
}
static CartOrder=this.baseUrl+"CartOrder";

static orderList(mobile){
  return this.baseUrl+"orderList/"+mobile;
}

static PostReview=this.baseUrl+"PostReview";

}

export default ApiUrl;
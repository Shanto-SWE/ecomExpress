// import * as localforage from "localforage";
class LocalStorageHelper {



    // Set Get Site Info Footer
    static SetSiteInfoFooter(JSONData){
        localforage.setItem('SiteInfoFooter',JSON.stringify(JSONData));
    }
    static GetSiteInfoFooter(callback){
        localforage.getItem('SiteInfoFooter', function (err, value) {
            if(err){
                callback(null)
            }
            else{
                callback(JSON.parse(value))
            }
        });
    }



    // Set Get User Mobile
    static setUserMobile(UserMobile){
        localStorage.setItem("UserMobile",UserMobile)
    }
    static getUserMobile(){
        return  localStorage.getItem("UserMobile")
    }
    static removeUserMobile(){
        return  localStorage.removeItem("UserMobile")
    }



    static SetRedirectFromDetails(winlocation){
        sessionStorage.setItem("winlocation",winlocation)
    }

    static GetRedirectFromDetails(){
        return sessionStorage.getItem("winlocation");
    }
}
export default LocalStorageHelper;
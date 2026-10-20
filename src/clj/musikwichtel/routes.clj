(ns musikwichtel.routes
  (:require [compojure.core :refer [defroutes GET POST context]]
            [compojure.route :as route]
            [ring.util.response :as resp]
            [ring.middleware.json :refer [wrap-json-response wrap-json-body]]
            [ring.middleware.params :refer [wrap-params]]
            [ring.middleware.keyword-params :refer [wrap-keyword-params]]
            [ring.middleware.resource :refer [wrap-resource]]
            [ring.middleware.content-type :refer [wrap-content-type]]
            [ring.middleware.not-modified :refer [wrap-not-modified]]
            [musikwichtel.auth :refer [wrap-auth-stack]]
            [musikwichtel.api :as api]))

(defn make-app [storage game-id]
  (let [routes
        (compojure.core/routes
          (GET "/health" []
            (resp/response {:status "ok"}))

          (context "/api" []
            (GET "/state" req
              (api/handle-get-state storage game-id req))
            (POST "/login" req
              (api/handle-login req))
            (POST "/logout" req
              (api/handle-logout req))
            (POST "/start" req
              (api/handle-start storage game-id req))
            (POST "/stop" req
              (api/handle-stop storage game-id req))
            (POST "/reset" req
              (api/handle-reset storage game-id req))
            (POST "/name" req
              (api/handle-update-name storage game-id req)))

          (GET "/" []
            (-> (resp/resource-response "public/index.html")
                (resp/content-type "text/html; charset=utf-8")))

          (route/resources "/" {:root "public"})

          (route/not-found
            (-> (resp/resource-response "public/index.html")
                (resp/content-type "text/html; charset=utf-8"))))]

    (-> routes
        wrap-keyword-params
        wrap-params
        (wrap-json-body {:keywords? true})
        wrap-json-response
        wrap-auth-stack
        (wrap-resource "public")
        wrap-content-type
        wrap-not-modified)))

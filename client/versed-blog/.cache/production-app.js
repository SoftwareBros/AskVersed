import { apiRunner, apiRunnerAsync } from "./api-runner-browser"
import React, { createElement } from "react"
import ReactDOM from "react-dom"
import { Router, Route, withRouter, matchPath } from "react-router-dom"
import { ScrollContext } from "gatsby-react-router-scroll"
import domReady from "domready"
import {
  shouldUpdateScroll,
  attachToHistory,
  init as navigationInit,
} from "./navigation"
import history from "./history"
window.___history = history
import emitter from "./emitter"
window.___emitter = emitter
import PageRenderer from "./page-renderer"
import asyncRequires from "./async-requires"
import loader from "./loader"

window.asyncRequires = asyncRequires
window.matchPath = matchPath

loader.addPagesArray([window.page])
loader.addDataPaths({ [window.page.jsonName]: window.dataPath })
loader.addProdRequires(asyncRequires)

navigationInit()

// Let the site/plugins run code very early.
apiRunnerAsync(`onClientEntry`).then(() => {
  // Let plugins register a service worker. The plugin just needs
  // to return true.
  if (apiRunner(`registerServiceWorker`).length > 0) {
    require(`./register-service-worker`)
  }

  // Call onRouteUpdate on the initial page load.
  apiRunner(`onRouteUpdate`, {
    location: history.location,
    action: history.action,
  })

  const AltRouter = apiRunner(`replaceRouterComponent`, { history })[0]

  loader.getResourcesForPathname(window.location.pathname, () => {
    const Root = () =>
      createElement(
        AltRouter ? AltRouter : Router,
        {
          basename: __PATH_PREFIX__,
          history: !AltRouter ? history : undefined,
        },
        createElement(
          ScrollContext,
          { shouldUpdateScroll },
          createElement(withRouter(Route), {
            render: routeProps => {
              attachToHistory(routeProps.history)

              if (loader.getPage(routeProps.location.pathname)) {
                return createElement(PageRenderer, {
                  isPage: true,
                  ...routeProps,
                })
              } else {
                return createElement(PageRenderer, {
                  isPage: true,
                  location: { pathname: `/404.html` },
                })
              }
            },
          })
        )
      )

    const NewRoot = apiRunner(`wrapRootComponent`, { Root }, Root)[0]

    const renderer = apiRunner(
      `replaceHydrateFunction`,
      undefined,
      ReactDOM.hydrate
    )[0]

    domReady(() => {
      renderer(
        <NewRoot />,
        typeof window !== `undefined`
          ? document.getElementById(`___gatsby`)
          : void 0,
        () => {
          apiRunner(`onInitialClientRender`)
        }
      )
    })
  })
})
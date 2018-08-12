

import * as React from "react";
import * as compJSON from './Resources-components/av_comp.js';
import * as progJSON from './Resources-components/av_prog.js';

export default class Resources extends React.Component<any, any>{
  public constructor(props: any) {
    super(props);
    compJSON.push.apply(compJSON,progJSON);
    this.state = {
      all: compJSON
    }
  }


  public render(){
    // tslint:disable-next-line:no-console
    console.log(this.state.ahings)
    // tslint:disable-next-line:no-console
    console.log(this.state.comp)
    return(
      this.state.all.map( (obj: any)=> {
        return(

        <div className="card" key={/* tslint:disable:no-string-literal */"card"+obj["Name"]}>
        <div className="card-body">
          <h4 className="card-title">{/* tslint:disable:no-string-literal */obj["Categoraization within STEM"]}</h4>
          <h5 className="card-title">{/* tslint:disable:no-string-literal */obj["Name"]}</h5>
          <p className="card-text">
            {/* tslint:disable:no-string-literal */obj["Description"]}
          </p>
          <a href={/* tslint:disable:no-string-literal */obj["URL"]} className="btn btn-primary">Website</a>
        </div>
      </div>
      )
      })
      
    );
  }
}
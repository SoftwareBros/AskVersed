import * as React from "react";
import * as compJSON from './Resources-components/av_comp.js';
import * as progJSON from './Resources-components/av_prog.js';

export default class Resources extends React.Component<{}, any>{
  public constructor(props: any) {
    super(props);

    this.state = {
      comp: compJSON,
      prog: progJSON
      
    }
  }
  
  public render(){
  	// tslint:disable-next-line:no-console
  	console.log(this.state.prog)
  	// tslint:disable-next-line:no-console
  	console.log(this.state.comp)
  	return(
  		<p>Hello</p>
  	)
  }
}

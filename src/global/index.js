import registerElement from "./register-element";
import registerProperties from "./register-properties";

export function globalRegister(app){
  app.use(registerElement);
  app.use(registerProperties);
}

import { h } from "preact";
import { memo } from "preact/compat";
import loadable from "@loadable/component";
import { PrerenderedComponent } from "react-prerendered-component";

const prerenderedLoadable = (dynamicImport, Fallback) => {
  const LoadableComponent = loadable(dynamicImport);
  return memo(props => (
    // you can use the `.preload()` method from react-loadable or react-imported-component`
    <PrerenderedComponent live={LoadableComponent.load()} style={{ height: "inherit" }}>
      <LoadableComponent {...props} fallback={<Fallback />} />
    </PrerenderedComponent>
  ));
}

export default prerenderedLoadable;
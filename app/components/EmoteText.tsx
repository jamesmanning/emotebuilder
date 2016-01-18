import * as React from 'react';
import {EmoteMap, EmoteObject, EmoteObjectSerializer, HtmlOutputData} from 'emotes';

interface EmoteTextProps {
  emoteObject: EmoteObject,
}

export default class EmoteText extends React.Component<EmoteTextProps, any> {
  constructor(props: EmoteTextProps) {
    super(props);
    this.emoteObjectSerializer = new EmoteObjectSerializer();
  }

  private emoteObjectSerializer: EmoteObjectSerializer;

  render() {
		const serialized = this.emoteObjectSerializer.serialize(this.props.emoteObject);
    return (<span>{serialized || this.props.emoteObject.originalString}</span>);
	}
}

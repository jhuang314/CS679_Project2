var THREEx		= THREEx || {};
	
	THREEx.ShaderLib	= THREEx.ShaderLib	|| {};
	THREEx.UniformsLib	= THREEx.UniformsLib	|| {};
	THREEx.AttributesLib	= THREEx.AttributesLib	|| {};
	
	THREEx.AttributesLib['ball'] = {};
	
	THREEx.UniformsLib['ball']	= {
		delta: {type: 'f', value: 0.0},
		scale: {type: 'f', value: 1.0},
		alpha: {type: 'f', value: 1.0}
	};
	
	THREEx.UniformsLib['ball']	= {
		delta: {type: 'f', value: 0.0},
		scale: {type: 'f', value: 1.0},
		alpha: {type: 'f', value: 1.0}
	};
	
	THREEx.ShaderLib['ball']	= {
	vertexShader:	[
		"#ifdef GL_ES",
			"precision highp float;",
		"#endif",
		"varying vec2 vUv;",
		"void main(){",
			"vUv	= uv;",
			"gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);",
		"}"
		].join( "\n" ),
	fragmentShader: [
		"#ifdef GL_ES",
			"precision highp float;",
		"#endif",
		"void main(void) {\n",
		"// Return the pixel color: always output red\n",
		"gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);\n",
		"}"
		].join( "\n" )
	};

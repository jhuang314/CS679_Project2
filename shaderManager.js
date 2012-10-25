var THREEx		= THREEx || {};
var cycle_s = 0;	
	THREEx.ShaderLib	= THREEx.ShaderLib	|| {};
	THREEx.UniformsLib	= THREEx.UniformsLib	|| {};
	THREEx.AttributesLib	= THREEx.AttributesLib	|| {};
	
	THREEx.AttributesLib['ball'] = {};
	
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
		"varying vec3 vNormal;",
			
		"void main(){",
			"vNormal = normal;",
			"gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);",
		"}"
		].join( "\n" ),
	fragmentShader: [
		"#ifdef GL_ES",
			"precision highp float;",
		"#endif",
		
		"varying vec3 vNormal;",
		
		"void main(void) {\n",			
			 "vec3 light = vec3(100, 200, 200);",
			 "light = normalize(light);",
			 "float dProd = max(0.0, dot(vNormal, light));",
			 "gl_FragColor = vec4(dProd, dProd, dProd, 1.0);",
		"}"
		].join( "\n" )
	};

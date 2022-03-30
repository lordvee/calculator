# Calculator

This application runs under node.js and jas been made with Gatsby + Tailwind for the frontend and fastify on the backend side.
The frontend is served by default, whereas the API is accessed via /api/

The calculating algo is based on a simplified shunting-yard, where the operators are stacked depending on their precedence

This application contains a docker Makefile and can be started by simply building the container:

```
docker build . -t <your username>/calculator
docker run -p 3000:3000 -d <your username>/calculator
```

## The API 
the API is /api/calculate and expects data in the form of a stringified array of objects:

```
[
	{
		val: '5',
		type: 'number'
	},
	{
		val: 'x',
		type: 'operator'
		priority: '20'
	},
	{
		val: '6',
		type: 'number'
	}
]
```

The API returns an object in the form:

```
{
	expression: <inpu-expression>,
	result: number
}

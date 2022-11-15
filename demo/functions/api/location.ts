export const onRequest: PagesFunction = async (context) => {
  const { request } = context;

  return new Response(JSON.stringify(request.cf), {
    headers: {
      "content-type": "application/json;charset=utf-8",
    },
  });
};

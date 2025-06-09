$glitch_base_url = "https://dc7336a4-3887-4118-b631-a722e48b350a@api.glitch.com/git/"

$projects = @(
    #"gistwriter",
    #"paste-event-vs-clipboard-api",
    #"silken-descriptive-decade",
    #"thoughtful-glossy-sailboat",
    #"ring-lateral-diadem",
    #seed-aluminum-fang",
    #"cloud-functions-for-firebase",
    #"korenani",
    #"althex",
    #"thoughtful-shorthaired-avocado",
    #"rdfa-streaming-parser",
    #"bald-hazel-screw",
    #"hello-llama-index",
    #hello-google-keep-api",
    #"streaming-parser-playground",
    #"flatte",
    #"moukaeritai-static",
    #"moukaeritai-express",
    #"moukaeritai-fastify",
    #"hello-pocket",
    #"euvc-pr-ehime-u",
    #"extract-text-by-cheerio",
    #"uuid-moukaeritai-work",
    #"firebaseui-web",
    #"start-me-json",
    "purl-ts-terms",
    "microdata-rdf-streaming-parser",
    "localhost-moukaeritai-work",
    "dot-voting-view",
    "azure-moukaeritai-work"
)

foreach ($project in $projects) {
    git subtree add --prefix=$project "$glitch_base_url$project" main
    git subtree add --prefix=$project "$glitch_base_url$project" master
}
$diretorio_raiz = "/home/runner/work/mapa-claro-beta/mapa-claro-beta"
#$diretorio_raiz = "/home/runner/work/mapa-claro/mapa-claro"
$diretorio_trabalho = "$diretorio_raiz/scripts"
$diretorio_site = "$diretorio_raiz/docs"

$DateStr = Get-Date -Format "yyyy-MM-dd"

if (!(Test-Path "$diretorio_trabalho/bk/$DateStr")) {
    New-Item "$diretorio_trabalho/bk/$DateStr" -ItemType Directory
}

if (!(Test-Path "$diretorio_site/js/locations/old/$DateStr")) {
    New-Item "$diretorio_site/js/locations/old/$DateStr" -ItemType Directory
}

Copy-Item "$diretorio_trabalho/js/locations/locations-erroapi.json" -Destination "$diretorio_trabalho/bk/$DateStr/locations-erroapi.json" -Recurse -force
Copy-Item "$diretorio_trabalho/js/locations/locations-gpon.json" -Destination "$diretorio_trabalho/bk/$DateStr/locations-gpon.json" -Recurse -force
Copy-Item "$diretorio_trabalho/js/locations/locations-hfc.json" -Destination "$diretorio_trabalho/bk/$DateStr/locations-hfc.json" -Recurse -force
Copy-Item "$diretorio_trabalho/js/locations/locations-nada.json" -Destination "$diretorio_trabalho/bk/$DateStr/locations-nada.json" -Recurse -force
Copy-Item "$diretorio_trabalho/js/locations/locations-neutrogpon.json" -Destination "$diretorio_trabalho/bk/$DateStr/locations-neutrogpon.json" -Recurse -force
Copy-Item "$diretorio_trabalho/js/locations/locations-neutrohfc.json" -Destination "$diretorio_trabalho/bk/$DateStr/locations-neutrohfc.json" -Recurse -force
Copy-Item "$diretorio_trabalho/js/locations/locations-sobrepo.json" -Destination "$diretorio_trabalho/bk/$DateStr/locations-sobrepo.json" -Recurse -force
Copy-Item "$diretorio_trabalho/js/locations/locations-data-lista.json" -Destination "$diretorio_trabalho/bk/$DateStr/locations-data-lista.json" -Recurse -force

Copy-Item "$diretorio_trabalho/js/locations/locations-erroapi.json" -Destination "$diretorio_site/js/locations/locations-erroapi.json" -Recurse -force
Copy-Item "$diretorio_trabalho/js/locations/locations-gpon.json" -Destination "$diretorio_site/js/locations/locations-gpon.json" -Recurse -force
Copy-Item "$diretorio_trabalho/js/locations/locations-hfc.json" -Destination "$diretorio_site/js/locations/locations-hfc.json" -Recurse -force
Copy-Item "$diretorio_trabalho/js/locations/locations-nada.json" -Destination "$diretorio_site/js/locations/locations-nada.json" -Recurse -force
Copy-Item "$diretorio_trabalho/js/locations/locations-neutrogpon.json" -Destination "$diretorio_site/js/locations/locations-neutrogpon.json" -Recurse -force
Copy-Item "$diretorio_trabalho/js/locations/locations-neutrohfc.json" -Destination "$diretorio_site/js/locations/locations-neutrohfc.json" -Recurse -force
Copy-Item "$diretorio_trabalho/js/locations/locations-sobrepo.json" -Destination "$diretorio_site/js/locations/locations-sobrepo.json" -Recurse -force
Copy-Item "$diretorio_trabalho/js/locations/locations-data-lista.json" -Destination "$diretorio_site/js/locations/locations-data-lista.json" -Recurse -force

Copy-Item "$diretorio_trabalho/js/locations/locations-erroapi.json" -Destination "$diretorio_site/js/locations/old/$DateStr/locations-erroapi.json" -Recurse -force
Copy-Item "$diretorio_trabalho/js/locations/locations-gpon.json" -Destination "$diretorio_site/js/locations/old/$DateStr/locations-gpon.json" -Recurse -force
Copy-Item "$diretorio_trabalho/js/locations/locations-hfc.json" -Destination "$diretorio_site/js/locations/old/$DateStr/locations-hfc.json" -Recurse -force
Copy-Item "$diretorio_trabalho/js/locations/locations-nada.json" -Destination "$diretorio_site/js/locations/old/$DateStr/locations-nada.json" -Recurse -force
Copy-Item "$diretorio_trabalho/js/locations/locations-neutrogpon.json" -Destination "$diretorio_site/js/locations/old/$DateStr/locations-neutrogpon.json" -Recurse -force
Copy-Item "$diretorio_trabalho/js/locations/locations-neutrohfc.json" -Destination "$diretorio_site/js/locations/old/$DateStr/locations-neutrohfc.json" -Recurse -force
Copy-Item "$diretorio_trabalho/js/locations/locations-sobrepo.json" -Destination "$diretorio_site/js/locations/old/$DateStr/locations-sobrepo.json" -Recurse -force

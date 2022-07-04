import json

from django.http import HttpResponseBadRequest, JsonResponse
from django.shortcuts import get_object_or_404, render
import requests
from apps.checker.models import Urls


def home(request):
    return render(request, "home.html")


def urls(request):
    is_ajax = request.headers.get('X-Requested-With') == 'XMLHttpRequest'

    if is_ajax:
        if request.method == 'GET':
            urls = list(Urls.objects.all().values())
            return JsonResponse({'context': urls})
        if request.method == 'POST':
            data = json.load(request)
            url_ = data.get('payload')
            req = requests.get(url=url_['task'])

            Urls.objects.create(url=url_['task'], status=req.status_code)
            return JsonResponse({'status': 'URL added!'})
        return JsonResponse({'status': 'Invalid request'}, status=400)
    else:
        return HttpResponseBadRequest('Invalid request')


def url(request, urlId):
    is_ajax = request.headers.get('X-Requested-With') == 'XMLHttpRequest'

    if is_ajax:
        urls = get_object_or_404(Urls, id=urlId)

        if request.method == 'PUT':

            req = requests.get(url=urls.url)
            urls.status = req.status_code
            urls.save()

            return JsonResponse({'status': 'URL updated!'})

        return JsonResponse({'status': 'Invalid request'}, status=400)
    else:
        return HttpResponseBadRequest('Invalid request')

from django.db import models


class Urls(models.Model):
    url = models.CharField(max_length=250)
    status = models.CharField(max_length=100, blank=True, null=True)

    def __str__(self):
        return self.url

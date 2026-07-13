{% if cv.name %}
# Portfolio of {{ cv.name }}
{% endif %}

{% if cv.headline %}
{{ cv.headline }}

{% endif %}
{% if cv.phone %}
- Phone: {{cv.phone|replace("tel:", "")|replace("-"," ")}}
{% endif %}
{% if cv.email %}
- Email: [{{cv.email}}](mailto:{{cv.email}})
{% endif %}
{% if cv.location %}
- Location: {{cv.location}}
{% endif %}
{% if cv.website %}
- Website: [{{cv.website|replace("https://","")|replace("/","")}}]({{cv.website}})
{% endif %}
{% if cv.social_networks %}
{% for network in cv.social_networks %}
- {{network.network}}: [{{network.username}}]({{network.url}})
{% endfor %}
{% endif %}
{% if cv.custom_connections %}
{% for connection in cv.custom_connections %}
{% if connection.url %}
- [{{ connection.placeholder }}]({{ connection.url }})
{% else %}
- {{ connection.placeholder }}
{% endif %}
{% endfor %}
{% endif %}

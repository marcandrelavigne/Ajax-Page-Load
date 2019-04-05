# Ajax-Page-Load
An SEO friendly Ajax page loader using jQuery.


## HTML Markup
To make the script work, you must have two things in your markup: A container and Links.

<b>Container</b><br />
The content that must be fetched when changing page must be wrapped in the ```#page__content``` element (can be a <div>, <section> or whathever that can wrap content). If using WordPress, I recommend not including the header or the footer, so only content will be fetched (No Stylesheets and no Scripts). The code should looks like this:
  
```<?php get_header(); ?>
<div id="page__content">
  <!-- Your page content here -->
</div>
<?php get_footer(); ?>
```

<b>Links</b><br />
The links should contains specific informations. It should have the ```pagelink``` class, to make sure that the  ```changePage``` function is called. External links should not have that class though. Links must have a title attribute, to pass to the next page. It will be used as a temporary meta title. Links code example :
```
<a class="pagelink" href="https://example.com/page-2" title="Page 2 - Example Site" >Your Link</a>
```

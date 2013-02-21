# Editable
Very simple edit in place plugin for jQuery.

# How to use?
```html
<!DOCTYPE html>
<html>
    <head>
        <title>Editable Example</title>
        <script src="lib/jquery-1.9.1.min.js"></script>
        <script src="lib/jquery.editable.js"></script>

        <script type="text/javascript">
            $(document).ready(function () {
                $(".editable").editable();
                $(".editable_ml").editable({
                    field_type: 'textarea'
                });
            });
        </script>
    </head>
    <body>
        <div class="editable"></div>
        <div class="editable_ml"></div>
    </body>
</html>
```
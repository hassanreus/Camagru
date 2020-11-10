<?php require APPROOT . '/views/inc/header.php'; ?>
<div class="hero-body">
        <div class="container">
            <h1 class="title is-1" style="color : #0074D9;">Edit a User</h1>
            <div class="column">
                <a href="<?php echo URLROOT;?>posts" class="button is-link is-outlined has-text-left">
                <span class="icon">
                    <i class="fi-arrow-left"></i>
                </span>
                <p class="containt">Back</p>
                </a>
            </div>
        </div>
    </div>
    <div class="columns is-centered">
        <div class="field">
            <label class="label">Notification :</label>
            <div class="buttons has-addons">
                <a class="button <?= ($data['notify'] === "0") ? 'is-success is-selected' : '' ?>" href="<?php echo URLROOT ;?>users/notify" onclick="<?= ($data['notify'] === "0") ? 'return false;' : '' ?>">Yes</a>
                <a class="button <?= ($data['notify'] === "1") ? 'is-danger is-selected' : '' ?>" href="<?php echo URLROOT ;?>users/notify" onclick="<?= ($data['notify'] === "1") ? 'return false;' : '' ?>">No</a>
            </div>
        </div>
    </div>
    <div class="columns is-centered">
        <form action="<?php echo URLROOT;?>users/edit" method="post" class="box">
            <div class="field">
                <label class="label">Name: <sup>*</sup></label>
                <div class="control">
                    <input class="input <?php echo (!empty($data['name'])) ? 'is-success' : ''?>" type="text" name="name" id="name" placeholder="Your_name" value="<?= $data['name']?>">
                    <p class="help is-danger"><?php echo $data['name_err']?></p>
                </div>
            </div>
            <div class="field">
                <label class="label">Email: <sup>*</sup></label>
                <div class="control">
                    <input class="input <?php echo (!empty($data['email'])) ? 'is-success' : ''?>" type="email" name="email" placeholder="Your_email@gmail.com" value="<?= $data['email']?>">
                    <p class="help is-danger"><?php echo $data['email_err']?></p>
                </div>
            </div>
            <div class="field">
                <label class="label">Old password: <sup>*</sup></label>
                <div class="control">
                    <input class="input <?php echo (!empty($data['old_p'])) ? 'is-success' : ''?>" type="password" name="old_p" placeholder="Your_password" value="<?php echo $data['old_p']?>">
                    <p class="help is-danger"><?php echo $data['old_p_err']?></p>
                </div>
            </div>
            <div class="buttons column is-center">
                <input class="button is-primary" type="submit" name="submit" value="Edit All">&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;<a class="tag is-link is-light" href="<?php echo URLROOT ;?>users/edit_pass">Change password ?</a>
            </div>
            <input type="hidden" name="token" id="token" value="<?= $token; ?>" />
        </form>
    </div>
<?php require APPROOT . '/views/inc/footer.php'; ?>
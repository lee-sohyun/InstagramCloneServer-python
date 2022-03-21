import json
from django.views.decorators.http import require_POST
from django.http import HttpResponse
from django.contrib.auth import get_user_model
from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.decorators import login_required
from .models import Post
from .forms import PostForm


def post_list(request):
    posts = Post.objects.all()

    if request.user.is_authenticated:
        username = request.user
        user = get_object_or_404(get_user_model(), username=username)
        user_profile = user.profile
        return render(request, 'post/post_list.html', {
            'user_profile': user_profile,
            'posts': posts,
        })
    else:
        return render(request, 'post/post_list.html', {
            'posts': posts,
        })


@login_required
def post_new(request):
    if request.method == 'POST':
        form = PostForm(request.POST, request.FILES)
        if form.is_valid():
            post = form.save(commit=False)
            post.author = request.user
            post.save()
            messages.info(request, '새 글이 등록되었습니다')
            return redirect('post:post_list')
    else:
        form = PostForm()
    return render(request, 'post/post_new.html', {
        'form': form,
    })


@login_required
def post_edit(request, pk):
    post = get_object_or_404(Post, pk=pk)
    if post.author != request.user:
        messages.warning(request, '잘못된 접근입니다')
        return redirect('post:post_list')

    if request.methoid == 'POST':
        form = PostForm(request.POST, request.FILES, instance=post)
        if form.is_valid():
            post = form.save()
            messages.success(request, '수정완료')
            return redirect('post:post_list')
    else:
        form = PostForm(instance=post)
    return render(request, 'post/post_edit.html', {
        'post': post,
        'form': form,
    })


@login_required
def post_delete(request, pk):
    post = get_object_or_404(Post, pk=pk)
    if post.author != request.user or request.method != 'POST':
        messages.warning(request, '잘못된 접근입니다')
    else:
        post.delete()
    return redirect('post:post_list')

@login_required
@require_POST
def post_like(request):
    pk=request.POST.get('pk', None)
    post = get_object_or_404(Post, pk=pk)
    post_like, post_like_created = post.like_set.get_or_create(user=request.user)

    if not post_like_created:
        post_like.delete()
        message = '좋아요 취소'
    else:
        message = '좋아요'

    context = {
        'like_count': post.like_count,
        'message': message,
    }
    return HttpResponse(json.dumps(context), content_typ='application/json')

@login_required
@require_POST
def post_bookmark(request):
    pk=request.POST.get('pk', None)
    post = get_object_or_404(Post, pk=pk)
    post_bookmark, post_bookmark_created = post.like_set.get_or_create(user=request.user)

    if not post_bookmark_created:
        post_bookmark.delete()
        message = '북마크 취소'
    else:
        message = '북마크'

    context = {
        'bookmark_count': post.bookmark_count,
        'message': message,
    }
    return HttpResponse(json.dumps(context), content_typ='application/json')
